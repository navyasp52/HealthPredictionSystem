from sqlalchemy.orm import Session
from .models import Patient

def create_patient(db: Session, patient_data, prediction):

    patient = Patient(
        full_name=patient_data.full_name,
        dob=patient_data.dob,
        email=patient_data.email,
        glucose=patient_data.glucose,
        haemoglobin=patient_data.haemoglobin,
        cholesterol=patient_data.cholesterol,
        remarks=prediction
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient


def get_patients(db: Session):
    return db.query(Patient).all()


def update_patient(db: Session, patient_id: int, patient_data):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if patient:

        patient.full_name = patient_data.full_name
        patient.dob = patient_data.dob
        patient.email = patient_data.email
        patient.glucose = patient_data.glucose
        patient.haemoglobin = patient_data.haemoglobin
        patient.cholesterol = patient_data.cholesterol

        db.commit()
        db.refresh(patient)

    return patient


def delete_patient(db: Session, patient_id: int):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if patient:
        db.delete(patient)
        db.commit()

    return patient