from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, Field
from .base import ORMModel
from .doctor import DoctorOut
from .service import ServiceOut
from .user import UserOut

Status = Literal["pending", "confirmed", "completed", "cancelled"]


class AppointmentCreate(BaseModel):
    doctor_id: int
    service_id: int
    start_time: datetime
    notes: Optional[str] = Field(default=None, max_length=500)


class AppointmentStatusUpdate(BaseModel):
    status: Status


class AppointmentOut(ORMModel):
    id: int
    user_id: int
    doctor_id: int
    service_id: int
    start_time: datetime
    end_time: datetime
    status: str
    notes: Optional[str] = None
    doctor: Optional[DoctorOut] = None
    service: Optional[ServiceOut] = None


class AppointmentAdminOut(AppointmentOut):
    user: Optional[UserOut] = None


class AdminStats(BaseModel):
    users: int
    doctors: int
    services: int
    appointments: int
    upcoming: int
    by_status: dict
