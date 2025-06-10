from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from database import SessionLocal
from models import SensorData, PowerState, User
import numpy as np
import requests
import bcrypt
import time
import cv2
from fastapi import FastAPI
from threading import Thread
from contextlib import asynccontextmanager
from detection_module import process_with_roboflow, get_latest_frame, roboflow_crack_detector, get_latest_predictions, stop_detection, start_detection

# uvicorn main:app --host 0.0.0.0 --port 8000


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_detection()
    yield  # Wait for shutdown
    stop_detection()  # Cleanup on shutdown

app = FastAPI(lifespan=lifespan)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS for frontend access - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ESP32_IP = "192.168.62.54"

def generate_annotated_stream():
    while True:
        frame = get_latest_frame()
        if frame is None:
            time.sleep(0.05)
            continue

        # Process with Roboflow
        processed = process_with_roboflow(frame)

        # Encode to JPEG
        ret, jpeg = cv2.imencode('.jpg', processed)
        if not ret:
            continue

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

        time.sleep(0.05)

@app.get("/crack-detections")
def crack_detections():
    preds = get_latest_predictions()
    print("🔍 Returned predictions:", preds)
    return {"predictions": preds}

@app.get("/video-feed")
def video_feed():
    return StreamingResponse(generate_annotated_stream(), media_type="multipart/x-mixed-replace; boundary=frame")


@app.post("/update-sensors")
async def update_sensors(request: Request, db: Session = Depends(get_db)):
    data = await request.json()

    front = data.get("front") or data.get("frontDistance", 0)
    left = data.get("left") or data.get("leftDistance", 0)
    right = data.get("right") or data.get("rightDistance", 0)
    speed = data.get("motorSpeed", 0)
    rudder_direction = data.get("rudderDirection", "Going straight...")

    sensor = SensorData(
        front=front,
        left=left,
        right=right,
        motor_speed=speed,
        rudder_direction=rudder_direction
    )
    db.add(sensor)
    db.commit()
    db.refresh(sensor)

    return {
        "message": "Sensor data saved",
        "id": sensor.id,
        "front": front,
        "left": left,
        "right": right,
        "motor_speed": speed,
        "rudder_direction": rudder_direction
    }


@app.get("/sensor-data")
def get_sensor_data(db: Session = Depends(get_db)):
    latest = db.query(SensorData).order_by(SensorData.timestamp.desc()).first()
    if latest:
        return {
            "front": latest.front,
            "left": latest.left,
            "right": latest.right,
            "motor_speed": latest.motor_speed,
            "rudder_direction": latest.rudder_direction,
            "timestamp": latest.timestamp,
        }
    return {
        "front": 0,
        "left": 0,
        "right": 0,
        "motor_speed": 0,
        "rudder_direction": "Going straight...",
        "timestamp": None
    }



@app.post("/toggle")
async def toggle_power(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    desired_status = data.get("status", "off")

    esp32_online = True
    try:
        # ✅ Correct method for ESP32
        esp_response = requests.get(f"http://{ESP32_IP}/toggle", timeout=20)
        print("ESP32 responded:", esp_response.text)
    except requests.exceptions.RequestException as e:
        print("Failed to contact ESP32:", e)
        esp32_online = False

    power = PowerState(status=desired_status if esp32_online else "off")
    db.add(power)
    db.commit()
    db.refresh(power)

    return {
        "message": "Power state updated" if esp32_online else "Failed to reach ESP32",
        "status": power.status,
        "timestamp": power.timestamp,
        "esp32_online": esp32_online,
    }


import requests

ESP32_IP = "192.168.62.54"  # Set your actual ESP32 IP

'''
@app.get("/power-status")
def get_power_status():
    try:
        response = requests.get(f"http://{ESP32_IP}/status", timeout=5)
        raw_status = response.text.strip().upper()

        # ESP32 returns plain "ON" or "OFF"
        is_on = raw_status == "ON"
        return {
            "status": "on" if is_on else "off",
            "esp32_online": True
        }

    except requests.exceptions.RequestException as e:
        print("ESP32 unreachable:", e)
        return {
            "status": "off",
            "esp32_online": False
        }
'''

@app.get("/power-status")
def get_power_status():
    # TEMPORARY MOCK RESPONSE FOR TESTING
    return {
        "status": "on",
        "esp32_online": True
    }





@app.post("/signup")
async def signup(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    new_user = User(email=email, password_hash=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful", "user_id": new_user.id}



@app.post("/login")
async def login(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    user = db.query(User).filter(User.email == email).first()
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": user.id}


@app.post("/logout")
async def logout():
    return {"message": "Logout successful (simulated)"}

@app.get("/debug/sensors")
def debug_all_sensors(db: Session = Depends(get_db)):
    sensors = db.query(SensorData).all()
    return [{"id": s.id, "front": s.front, "left": s.left, "right": s.right, "motor_speed": s.motor_speed, "timestamp": s.timestamp} for s in sensors]
