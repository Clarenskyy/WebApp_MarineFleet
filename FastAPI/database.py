from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Change to your desired SQLite or PostgreSQL path
SQLALCHEMY_DATABASE_URL = "sqlite:///./esp32_data.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)
