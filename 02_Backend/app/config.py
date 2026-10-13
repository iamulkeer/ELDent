import os

SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60 * 24

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@eldent.az")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

WORK_START_HOUR = int(os.getenv("WORK_START_HOUR", "9"))
WORK_END_HOUR = int(os.getenv("WORK_END_HOUR", "18"))

APPOINTMENT_STATUSES = ("pending", "confirmed", "completed", "cancelled")
ACTIVE_STATUSES = ("pending", "confirmed")
