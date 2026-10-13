from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..security import require_admin

router = APIRouter(prefix="/doctors", tags=["doctors"])


def _get_or_404(db: Session, doctor_id: int) -> models.Doctor:
    doctor = db.get(models.Doctor, doctor_id)
    if not doctor:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Doctor not found")
    return doctor


@router.get("", response_model=List[schemas.DoctorOut])
def list_doctors(db: Session = Depends(get_db)):
    return db.query(models.Doctor).order_by(models.Doctor.id).all()


@router.get("/{doctor_id}", response_model=schemas.DoctorOut)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    return _get_or_404(db, doctor_id)


@router.post("", response_model=schemas.DoctorOut, status_code=status.HTTP_201_CREATED)
def create_doctor(data: schemas.DoctorCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    doctor = models.Doctor(**data.model_dump())
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.put("/{doctor_id}", response_model=schemas.DoctorOut)
def update_doctor(doctor_id: int, data: schemas.DoctorUpdate, db: Session = Depends(get_db),
                  _=Depends(require_admin)):
    doctor = _get_or_404(db, doctor_id)
    for key, value in data.model_dump().items():
        setattr(doctor, key, value)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.delete("/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    doctor = _get_or_404(db, doctor_id)
    if db.query(models.Appointment).filter(models.Appointment.doctor_id == doctor_id).first():
        raise HTTPException(status.HTTP_409_CONFLICT, "Doctor has appointments and cannot be deleted")
    db.delete(doctor)
    db.commit()
    return {"detail": "Doctor deleted"}
