from datetime import datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import config, models, schemas
from ..database import get_db
from ..security import get_current_user

router = APIRouter(prefix="/appointments", tags=["appointments"])


def validate_working_time(start: datetime, end: datetime):
    """Randevu gələcəkdə və iş saatları daxilində olmalıdır."""
    if start <= datetime.now():
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Appointment time must be in the future")
    day_start = start.replace(hour=config.WORK_START_HOUR, minute=0, second=0, microsecond=0)
    day_end = start.replace(hour=config.WORK_END_HOUR, minute=0, second=0, microsecond=0)
    if start < day_start or end > day_end:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            f"Appointment must be within working hours {config.WORK_START_HOUR:02d}:00-{config.WORK_END_HOUR:02d}:00",
        )


@router.post("", response_model=schemas.AppointmentOut, status_code=status.HTTP_201_CREATED)
def create_appointment(data: schemas.AppointmentCreate, db: Session = Depends(get_db),
                       user: models.User = Depends(get_current_user)):
    doctor = db.get(models.Doctor, data.doctor_id)
    service = db.get(models.Service, data.service_id)
    if not doctor or not service:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Doctor or service not found")

    start = data.start_time.replace(tzinfo=None, second=0, microsecond=0)
    end = start + timedelta(minutes=service.duration_minutes)
    validate_working_time(start, end)

    conflict = (
        db.query(models.Appointment)
        .filter(
            models.Appointment.doctor_id == doctor.id,
            models.Appointment.status.in_(config.ACTIVE_STATUSES),
            models.Appointment.start_time < end,
            models.Appointment.end_time > start,
        )
        .first()
    )
    if conflict:
        raise HTTPException(status.HTTP_409_CONFLICT, "Time slot is already booked for this doctor")

    appointment = models.Appointment(user_id=user.id, doctor_id=doctor.id, service_id=service.id,
                                     start_time=start, end_time=end, notes=data.notes, status="pending")
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("", response_model=List[schemas.AppointmentOut])
def list_appointments(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    q = db.query(models.Appointment)
    if user.role != "admin":
        q = q.filter(models.Appointment.user_id == user.id)
    return q.order_by(models.Appointment.start_time.desc()).all()


@router.get("/{appointment_id}", response_model=schemas.AppointmentOut)
def get_appointment(appointment_id: int, db: Session = Depends(get_db),
                    user: models.User = Depends(get_current_user)):
    appointment = db.get(models.Appointment, appointment_id)
    if not appointment:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Appointment not found")
    if appointment.user_id != user.id and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not your appointment")
    return appointment


@router.delete("/{appointment_id}")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db),
                       user: models.User = Depends(get_current_user)):
    appointment = db.get(models.Appointment, appointment_id)
    if not appointment:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Appointment not found")
    if appointment.user_id != user.id and user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not your appointment")
    if appointment.status == "completed":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Completed appointment cannot be cancelled")
    appointment.status = "cancelled"
    db.commit()
    return {"detail": "Appointment cancelled"}
