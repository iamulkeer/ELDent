from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import config, models, schemas
from ..database import get_db
from ..security import require_admin

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@router.get("/stats", response_model=schemas.AdminStats)
def stats(db: Session = Depends(get_db)):
    by_status = {s: 0 for s in config.APPOINTMENT_STATUSES}
    for st, count in db.query(models.Appointment.status, func.count(models.Appointment.id)).group_by(models.Appointment.status):
        by_status[st] = count
    upcoming = (db.query(models.Appointment)
                .filter(models.Appointment.start_time > datetime.now(),
                        models.Appointment.status.in_(config.ACTIVE_STATUSES)).count())
    return {
        "users": db.query(models.User).filter(models.User.role == "patient").count(),
        "doctors": db.query(models.Doctor).count(),
        "services": db.query(models.Service).count(),
        "appointments": db.query(models.Appointment).count(),
        "upcoming": upcoming,
        "by_status": by_status,
    }


@router.get("/appointments", response_model=List[schemas.AppointmentAdminOut])
def all_appointments(status_filter: str = None, db: Session = Depends(get_db)):
    q = db.query(models.Appointment)
    if status_filter:
        q = q.filter(models.Appointment.status == status_filter)
    return q.order_by(models.Appointment.start_time.desc()).all()


@router.patch("/appointments/{appointment_id}/status", response_model=schemas.AppointmentAdminOut)
def update_status(appointment_id: int, data: schemas.AppointmentStatusUpdate, db: Session = Depends(get_db)):
    appointment = db.get(models.Appointment, appointment_id)
    if not appointment:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Appointment not found")
    appointment.status = data.status
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("/users", response_model=List[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).order_by(models.User.id).all()
