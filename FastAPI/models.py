# models.py

from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    front = Column(Float, default=0)
    left = Column(Float, default=0)
    right = Column(Float, default=0)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class PowerState(Base):
    __tablename__ = "power_state"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, default="off")  # "on" or "off"
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
