from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from .base import ORMModel


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=150)
    phone: Optional[str] = Field(default=None, max_length=30)
    password: str = Field(min_length=6, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=150)
    phone: Optional[str] = Field(default=None, max_length=30)


class UserOut(ORMModel):
    id: int
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
