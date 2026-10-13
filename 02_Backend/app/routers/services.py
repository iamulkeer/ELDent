from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..security import require_admin

router = APIRouter(prefix="/services", tags=["services"])


def _get_or_404(db: Session, service_id: int) -> models.Service:
    service = db.get(models.Service, service_id)
    if not service:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")
    return service


def _check_name_free(db: Session, name: str, exclude_id: int = None):
    q = db.query(models.Service).filter(models.Service.name == name)
    if exclude_id:
        q = q.filter(models.Service.id != exclude_id)
    if q.first():
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Service already exists")


@router.get("", response_model=List[schemas.ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return db.query(models.Service).order_by(models.Service.id).all()


@router.get("/{service_id}", response_model=schemas.ServiceOut)
def get_service(service_id: int, db: Session = Depends(get_db)):
    return _get_or_404(db, service_id)


@router.post("", response_model=schemas.ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(data: schemas.ServiceCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    _check_name_free(db, data.name)
    service = models.Service(**data.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.put("/{service_id}", response_model=schemas.ServiceOut)
def update_service(service_id: int, data: schemas.ServiceUpdate, db: Session = Depends(get_db),
                   _=Depends(require_admin)):
    service = _get_or_404(db, service_id)
    _check_name_free(db, data.name, exclude_id=service_id)
    for key, value in data.model_dump().items():
        setattr(service, key, value)
    db.commit()
    db.refresh(service)
    return service


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    service = _get_or_404(db, service_id)
    if db.query(models.Appointment).filter(models.Appointment.service_id == service_id).first():
        raise HTTPException(status.HTTP_409_CONFLICT, "Service has appointments and cannot be deleted")
    db.delete(service)
    db.commit()
    return {"detail": "Service deleted"}
