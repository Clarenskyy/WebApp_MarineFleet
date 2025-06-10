# detection_module.py
from test import ESP32MJPEGReader  # move your ESP32MJPEGReader to its own file if needed
import cv2
import base64
import requests
import time
import numpy as np
from threading import Thread

# Shared variable
latest_predictions = []
reader = None
reader_thread = None
stop_thread = False

reader = ESP32MJPEGReader("http://192.168.18.169/stream")
reader.start()

def get_latest_predictions():
    return latest_predictions

def roboflow_crack_detector():
    global latest_predictions, reader
    API_KEY = "PoT0jzGUtNb0bQOEf0Ja"
    MODEL_ENDPOINT = "https://detect.roboflow.com/underwater-crack-detection/3"
    PIXELS_PER_MM = 3.2


    reader.start()

    time.sleep(3)
    print("✅ Crack detection thread started")

    last_inference = 0
    inference_interval = 2.0

    while True:
        frame = reader.get_frame()
        if frame is None:
            time.sleep(0.2)
            continue

        current_time = time.time()
        if current_time - last_inference < inference_interval:
            continue
        last_inference = current_time

        try:
            success, buffer = cv2.imencode('.jpg', frame)
            if not success:
                continue
            image_base64 = base64.b64encode(buffer).decode('utf-8')

            params = {
                "api_key": API_KEY,
                "confidence": 0.40,
                "overlap": 0.30
            }

            response = requests.post(
                MODEL_ENDPOINT,
                data=image_base64,
                params=params,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=20
            )

            if response.status_code == 200:
                result = response.json()
                latest_predictions = result.get('predictions', [])
            else:
                latest_predictions = []

        except Exception as e:
            print(f"Error: {e}")
            latest_predictions = []

        print("🧠 Predictions:", latest_predictions)
        time.sleep(0.1)

def start_detection():
    global reader_thread, stop_thread
    stop_thread = False
    reader_thread = Thread(target=roboflow_crack_detector, daemon=True)
    reader_thread.start()

def stop_detection():
    global stop_thread
    stop_thread = True

def get_latest_frame():
    return reader.get_frame()

# ✅ This is the function you can use in main.py to draw annotations on frames
def process_with_roboflow(frame):
    API_KEY = "PoT0jzGUtNb0bQOEf0Ja"
    MODEL_ENDPOINT = "https://detect.roboflow.com/underwater-crack-detection/3"

    try:
        success, buffer = cv2.imencode('.jpg', frame)
        if not success:
            return frame

        image_base64 = base64.b64encode(buffer).decode('utf-8')

        params = {
            "api_key": API_KEY,
            "confidence": 0.40,
            "overlap": 0.30
        }

        response = requests.post(
            MODEL_ENDPOINT,
            data=image_base64,
            params=params,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )

        if response.status_code == 200:
            predictions = response.json().get('predictions', [])
            for pred in predictions:
                x, y = int(pred["x"]), int(pred["y"])
                w, h = int(pred["width"]), int(pred["height"])
                label = pred["class"]

                # Draw box and label
                cv2.rectangle(frame, (x - w // 2, y - h // 2), (x + w // 2, y + h // 2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x - w // 2, y - h // 2 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    except Exception as e:
        print(f"Error in process_with_roboflow: {e}")

    return frame

