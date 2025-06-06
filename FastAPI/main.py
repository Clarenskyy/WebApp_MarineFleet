from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

sensor_data = {"front": 0, "left": 0, "right": 0}
power_state = {"status": "off"}

# CORS for frontend access - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Replace with your actual ESP32 IP address
ESP32_IP = "192.168.18.170"

@app.post("/update-sensors")
async def update_sensors(request: Request):
    data = await request.json()
    sensor_data["front"] = data.get("front", 0)
    sensor_data["left"] = data.get("left", 0)
    sensor_data["right"] = data.get("right", 0)
    return {"message": "Sensor data updated"}

@app.get("/sensor-data")
def get_sensor_data():
    return sensor_data

# ✅ Endpoint to toggle device power and notify ESP32
@app.post("/toggle")
async def toggle_power(request: Request):
    data = await request.json()
    desired_status = data.get("status", "off")

    esp32_online = True
    try:
        # Try sending the command to ESP32 first
        esp_response = requests.post(f"http://{ESP32_IP}/power", json={"status": desired_status}, timeout=2)
        print("ESP32 responded:", esp_response.text)

        # Only update the backend state if ESP32 responded
        power_state["status"] = desired_status

    except requests.exceptions.RequestException as e:
        print("Failed to contact ESP32:", e)
        esp32_online = False

    return {
        "message": "Power state updated" if esp32_online else "Failed to reach ESP32",
        "status": power_state["status"],
        "esp32_online": esp32_online,
    }


@app.get("/power-status")
def get_power_status():
    return power_state
