from typing import Optional
from pydantic import BaseModel, Field
from .base import ORMModel


class ServiceBase(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: Optional[str] = None
    price: float = Field(default=0, ge=0)
    duration_minutes: int = Field(default=30, ge=5, le=480)


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    pass


class ServiceOut(ORMModel, ServiceBase):
    id: int
