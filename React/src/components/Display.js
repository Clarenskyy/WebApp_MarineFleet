import React, { useState, useEffect } from "react";
import "./Display.css";

function Display() {
  const [isOn, setIsOn] = useState(false);
  const [front, setFront] = useState(100);
  const [left, setLeft] = useState(100);
  const [right, setRight] = useState(100);
  const [notification, setNotification] = useState("");
  const [motorSpeed, setMotorSpeed] = useState(0);


  const ESP32_IP = "192.168.62.54"; // Replace with your ESP32 IP
  const ROBOFLOW_API_KEY = "PoT0jzGUtNb0bQOEf0Ja";
  const MODEL_ENDPOINT = "https://detect.roboflow.com/YOUR_MODEL/1";

  // Toggle relay state via FastAPI
  const toggleSwitch = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: isOn ? "off" : "on" }),
      });

      const data = await res.json();
      setIsOn(data.status === "on");

      if (!data.esp32_online) {
        setNotification("⚠️ ESP32 device is offline or unreachable.");
      } else {
        setNotification(""); // Clear if it's back
      }

      console.log("Toggle response:", data);
    } catch (err) {
      console.error("Failed to toggle via backend:", err);
      setNotification("⚠️ Backend communication failed.");
    }
  };

  // On mount, fetch current status from FastAPI
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/power-status");
        const data = await res.json();
        setIsOn(data.status === "on");
      } catch (err) {
        console.error("Failed to get power status:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  // Fetch sensor data periodically if power is ON
  useEffect(() => {
    if (isOn) {
  const interval = setInterval(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/sensor-data");
      const data = await response.json();

      setFront(data.front);
      setLeft(data.left);
      setRight(data.right);
      setMotorSpeed(data.motor_speed); // <- Add this

      if (data.front <= 50) {
        setNotification("Obstacles ahead detected...steering left automatically");
      } else if (data.right <= 50) {
        setNotification("Obstacles in right detected...steering left automatically");
      } else if (data.left <= 50) {
        setNotification("Obstacles in left detected...steering right automatically");
      } else {
        setNotification("");
      }
    } catch (error) {
      console.error("Failed to fetch sensor data:", error);
    }
  }, 1000);


      return () => clearInterval(interval);
    } else {
      setFront("");
      setLeft("");
      setRight("");
      setNotification("");
      setMotorSpeed(0);

    }
  }, [isOn]);

  return (
    <div className="display-container">
      {/* VIDEO DISPLAY */}
      <div className="camera-section">
        <div className="camera-view">
          {isOn ? (
            <img
              src={`http://${ESP32_IP}`}
              alt="ESP32-CAM Stream"
              style={{ width: "100%", maxWidth: "480px", border: "1px solid #ccc" }}
            />
          ) : (
            <div className="camera-placeholder">
              <p>Camera is off</p>
            </div>
          )}
          {notification.includes("CAM") && (
            <div className="camera-overlay">
              <span>{notification}</span>
            </div>
          )}
          <div className="cam-label">ESP32-CAM</div>
        </div>
      </div>

      {/* ON & OFF Button */}
      <div className="dashboard-container">
        <div className="dashboard-section">
          <div className="control-section">
            <div className="toggle-section">
              <label className="switch">
                <input type="checkbox" checked={isOn} onChange={toggleSwitch} />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label">{isOn ? "ON" : "OFF"}</span>
            </div>
            <p className="instruction">
              Turn the boat ON or OFF. When powered on, the boat begins to scan autonomously.
            </p>
            {notification && (
              <div className="status-item notification">
                🚨 {notification}
              </div>
            )}
          </div>

          {/* DASHBOARD DISPLAY */}
          <div className="status-section">
            <h2>Dashboard</h2>
            <div className="status-item">
              <strong>Camera Status:</strong>{" "}
              <span className="value">{isOn ? "Active" : "Inactive"}</span>
            </div>
            <div className="status-item">
              <strong>Speed:</strong> <span className="value">{motorSpeed} rpm</span>
            </div>
            <div className="status-item-title">
              <strong>Scanning the perimeter from:</strong>
            </div>
            <div className="status-item">
              <strong>Front:</strong> <span className="value">{front !== "" ? `${front}m` : "--"}</span>
              <strong>Right:</strong> <span className="value">{right !== "" ? `${right}m` : "--"}</span>
              <strong>Left:</strong> <span className="value">{left !== "" ? `${left}m` : "--"}</span>
            </div>

            {notification && (
              <div className="status-item notification">
                🚨 {notification}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
