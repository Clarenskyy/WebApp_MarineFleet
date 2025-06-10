import React, { useState, useEffect } from "react";
import "./Display.css";

function Display() {
  const [isOn, setIsOn] = useState(false);
  const [front, setFront] = useState(100);
  const [left, setLeft] = useState(100);
  const [right, setRight] = useState(100);
  const [motorSpeed, setMotorSpeed] = useState(0);
  const [crackDetections, setCrackDetections] = useState([]);
  const [rudderDirection, setRudderDirection] = useState("Going straight...");
  const PIXELS_PER_CM = 32;
  const [esp32Status, setEsp32Status] = useState(""); // ⚠️ ESP32 connectivity warnings

  const ESP32_IP = "192.168.62.54";

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
        setEsp32Status("⚠️ ESP32 device is offline or unreachable.");
      } else {
        setEsp32Status("");
      }

      console.log("Toggle response:", data);
    } catch (err) {
      console.error("Failed to toggle via backend:", err);
      setEsp32Status("⚠️ Backend communication failed.");
    }
  };

  // Get current status from ESP32 via backend
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/power-status");
        const data = await res.json();
        setIsOn(data.status === "on");

        if (!data.esp32_online) {
          setEsp32Status("⚠️ ESP32 device is offline or unreachable.");
        } else {
          setEsp32Status("");
        }
      } catch (err) {
        console.error("Failed to get power status:", err);
        setEsp32Status("⚠️ Backend communication failed.");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Fetch sensor data if ON
  useEffect(() => {
    if (isOn) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/sensor-data");
          const data = await response.json();

          setFront(data.front);
          setLeft(data.left);
          setRight(data.right);
          setMotorSpeed(data.motor_speed);
          setRudderDirection(data.rudder_direction);
        } catch (error) {
          console.error("Failed to fetch sensor data:", error);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setFront("");
      setLeft("");
      setRight("");
      setMotorSpeed(0);
      setRudderDirection("");
    }
  }, [isOn]);

  useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/crack-detections");
      const data = await res.json();
      setCrackDetections(data.predictions);  // show these in UI
    } catch (err) {
      console.error("Failed to fetch crack detections:", err);
    }
  }, 2000);
  return () => clearInterval(interval);
}, []);


  return (
    <div className="display-container">
      {/* VIDEO DISPLAY */}
      <div className="camera-section">
        <div className="camera-view">
          {isOn ? (
            <img
              src={`http://127.0.0.1:8000/video-feed`}
              alt="ESP32-CAM Stream"
              style={{ width: "100%", maxWidth: "480px", border: "1px solid #ccc" }}
            />
          ) : (
            <div className="camera-placeholder">
              <p>Camera is off</p>
            </div>
          )}
          {esp32Status.includes("CAM") && (
            <div className="camera-overlay">
              <span>{esp32Status}</span>
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
            {esp32Status && (
              <div className="status-item notification">
                🚨 {esp32Status}
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
              <strong>Crack Detections:</strong>
              {crackDetections.length > 0 ? (
                <ul>
                  {crackDetections.map((det, idx) => (
                    <li key={idx}>
                      {det.class} - Confidence: {(det.confidence * 100).toFixed(1)}% — 
                      Width: {(det.width / PIXELS_PER_CM).toFixed(2)} cm, 
                      Height: {(det.height / PIXELS_PER_CM).toFixed(2)} cm
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No cracks detected</p>
              )}
            </div>
            <div className="status-item">
              <strong>Motor Speed:</strong> <span className="value">{motorSpeed} rpm</span>
            </div>
            <div className="status-item-title">
              <strong>Scanning the perimeter from:</strong>
            </div>
            <div className="status-item">
              <strong>Front:</strong> <span className="value">{front !== "" ? `${front}cm` : "--"}</span>
              <strong>Right:</strong> <span className="value">{right !== "" ? `${right}cm` : "--"}</span>
              <strong>Left:</strong> <span className="value">{left !== "" ? `${left}cm` : "--"}</span>
            </div>
            <div className="status-item">
              <strong>Rudder:</strong> <span className="value">🧭 {rudderDirection}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
