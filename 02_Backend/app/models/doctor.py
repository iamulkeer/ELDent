from sqlalchemy import Column, Integer, String, Text
from ..database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    specialty = Column(String(150), nullable=False)
    experience_years = Column(Integer, nullable=False, default=0)
    bio = Column(Text, nullable=True)
