"""İlkin məlumatlar: xidmətlər və admin hesabı (təkrar işə salındıqda dublikat yaratmır)."""
from . import config, models
from .database import SessionLocal
from .security import hash_password

DEFAULT_SERVICES = [
    ("Müayinə", "Diş və ağız boşluğunun ümumi müayinəsi, məsləhət", 30, 30),
    ("Diş çəkimi", "Zədələnmiş dişin təhlükəsiz çıxarılması (lokal anesteziya ilə)", 80, 45),
    ("Plomb", "Çürük dişin müalicəsi və estetik plomb", 100, 60),
    ("İmplant", "Itirilmiş dişin titan implantla bərpası", 800, 90),
]


def run():
    db = SessionLocal()
    try:
        for name, description, price, minutes in DEFAULT_SERVICES:
            if not db.query(models.Service).filter_by(name=name).first():
                db.add(models.Service(name=name, description=description, price=price, duration_minutes=minutes))
        if not db.query(models.User).filter_by(email=config.ADMIN_EMAIL.lower()).first():
            db.add(models.User(email=config.ADMIN_EMAIL.lower(), full_name="Administrator",
                               hashed_password=hash_password(config.ADMIN_PASSWORD), role="admin"))
        db.commit()
    finally:
        db.close()
