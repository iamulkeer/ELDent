import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from . import seed
from .database import engine
from .routers import auth, doctors, services, appointments, admin


def wait_for_db(retries: int = 30, delay: float = 2.0):
    for attempt in range(retries):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            return
        except OperationalError:
            print(f"Database not ready ({attempt + 1}/{retries}), retrying...", flush=True)
            time.sleep(delay)
    raise RuntimeError("Database is unavailable")


@asynccontextmanager
async def lifespan(app: FastAPI):
    wait_for_db()
    seed.run()  # cədvəllər Alembic ilə yaradılır: alembic upgrade head
    yield


app = FastAPI(title="ELDent API", version="1.0.0",
              description="Stomatoloq randevu sistemi — REST API", lifespan=lifespan)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

for r in (auth.router, doctors.router, services.router, appointments.router, admin.router):
    app.include_router(r)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "docs": "/docs"}
