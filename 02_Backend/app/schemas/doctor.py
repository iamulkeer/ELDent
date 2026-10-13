from typing import Optional
from pydantic import BaseModel, Field
from .base import ORMModel


class DoctorBase(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    specialty: str = Field(min_length=2, max_length=150)
    experience_years: int = Field(default=0, ge=0, le=70)
    bio: Optional[str] = None


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(DoctorBase):
    pass


class DoctorOut(ORMModel, DoctorBase):
    id: int
