from sqlalchemy import Column, Integer, String, Float, Text
from ..database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False, default=0)
    duration_minutes = Column(Integer, nullable=False, default=30)
