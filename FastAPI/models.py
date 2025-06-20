from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()


class SensorData(Base):
    __tablename__ = "sensor_data"
    
    id = Column(Integer, primary_key=True, index=True)
    front = Column(Float)
    left = Column(Float)
    right = Column(Float)
    motor_speed = Column(Float)  # ✅ You missed this
    rudder_direction = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class CrackDetection(Base):
    __tablename__ = "crack_detections"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String)
    confidence = Column(Float)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)


class PowerState(Base):
    __tablename__ = "power_state"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, default="off")  # Values: "on" or "off"
    timestamp = Column(DateTime(timezone=True), server_default=func.now())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

