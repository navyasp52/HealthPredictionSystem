from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine, SessionLocal
from .schemas import PatientCreate
from .crud import (
    create_patient,
    get_patients,
    update_patient,
    delete_patient
)

app = FastAPI(title="Health Prediction API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "Health Prediction API Running Successfully"
    }


@app.post("/patients")
def add_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):

    if patient.glucose > 140:
        prediction = "Possible Diabetes Risk"

    elif patient.haemoglobin < 12:
        prediction = "Possible Anemia Risk"

    elif patient.cholesterol > 240:
        prediction = "Possible Heart Disease Risk"

    else:
        prediction = "Healthy"

    saved_patient = create_patient(
        db,
        patient,
        prediction
    )

    return saved_patient


@app.get("/patients")
def read_patients(
    db: Session = Depends(get_db)
):
    return get_patients(db)


@app.put("/patients/{patient_id}")
def edit_patient(
    patient_id: int,
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    return update_patient(
        db,
        patient_id,
        patient
    )


@app.delete("/patients/{patient_id}")
def remove_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    return delete_patient(
        db,
        patient_id
    )