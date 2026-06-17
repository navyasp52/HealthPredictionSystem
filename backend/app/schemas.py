from pydantic import BaseModel, EmailStr

class PatientCreate(BaseModel):
    full_name: str
    dob: str
    email: EmailStr

    glucose: float
    haemoglobin: float
    cholesterol: float


class PatientResponse(BaseModel):
    id: int
    full_name: str
    dob: str
    email: str

    glucose: float
    haemoglobin: float
    cholesterol: float

    remarks: str

    class Config:
        from_attributes = True