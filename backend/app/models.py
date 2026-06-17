from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String)
    dob = Column(String)
    email = Column(String)

    glucose = Column(Float)
    haemoglobin = Column(Float)
    cholesterol = Column(Float)

    remarks = Column(String)