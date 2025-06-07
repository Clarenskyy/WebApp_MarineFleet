from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal
from models import SensorData, PowerState, User
import requests
import bcrypt

app = FastAPI()

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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ESP32_IP = "192.168.62.54"

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





@app.post("/signup")
async def signup(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")

    # Check if user already exists
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = User(username=username, password_hash=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}


@app.post("/login")
async def login(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    user = db.query(User).filter(User.username == username).first()
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"message": "Login successful", "user_id": user.id}


@app.post("/logout")
async def logout():
    return {"message": "Logout successful (simulated)"}

@app.get("/debug/sensors")
def debug_all_sensors(db: Session = Depends(get_db)):
    sensors = db.query(SensorData).all()
    return [{"id": s.id, "front": s.front, "left": s.left, "right": s.right, "motor_speed": s.motor_speed, "timestamp": s.timestamp} for s in sensors]
