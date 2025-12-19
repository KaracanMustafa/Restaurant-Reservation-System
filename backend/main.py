from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from db import get_db
from models import Reservation, Table
from schemas import (
    ReservationCreate, ReservationResponse, ReservationUpdate,
    LoginRequest, LoginResponse, AvailabilityResponse
)

app = FastAPI(title="Restaurant Reservation API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcoded admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"
ADMIN_TOKEN = "dummy"

def require_admin(authorization: Optional[str] = Header(None)):
    """Dependency to check admin authentication"""
    if not authorization or authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

@app.get("/")
def read_root():
    return {"message": "Restaurant Reservation API", "docs": "/docs"}

@app.get("/api/availability", response_model=List[AvailabilityResponse])
def get_availability(date: str, time: str, db: Session = Depends(get_db)):
    """Check which tables are available for a given date/time"""
    availability = []
    
    for table_id in range(1, 11):  # Tables 1-10
        # Check if table has any pending or approved reservation at this date/time
        conflict = db.query(Reservation).filter(
            Reservation.table_id == table_id,
            Reservation.date == date,
            Reservation.time == time,
            Reservation.status.in_(["pending", "approved"])
        ).first()
        
        if conflict is None:
            status = "available"
            available = True
        elif conflict.status == "pending":
            status = "pending"
            available = False
        else:  # approved
            status = "approved"
            available = False
        
        availability.append({
            "table_id": table_id,
            "available": available,
            "status": status
        })
    
    return availability

@app.post("/api/reservations", response_model=ReservationResponse, status_code=201)
def create_reservation(reservation: ReservationCreate, db: Session = Depends(get_db)):
    """Create a new reservation"""
    # Validate table_id exists
    table = db.query(Table).filter(Table.id == reservation.table_id).first()
    if not table:
        raise HTTPException(status_code=400, detail="Invalid table_id")
    
    # Check for conflicts (same table, date, time with pending/approved status)
    conflict = db.query(Reservation).filter(
        Reservation.table_id == reservation.table_id,
        Reservation.date == reservation.date,
        Reservation.time == reservation.time,
        Reservation.status.in_(["pending", "approved"])
    ).first()
    
    if conflict:
        raise HTTPException(
            status_code=409, 
            detail="Bu tarih/saat için masa dolu."
        )
    
    # Create reservation with pending status
    db_reservation = Reservation(
        **reservation.model_dump(),
        status="pending"
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    
    return db_reservation

@app.post("/api/admin/login", response_model=LoginResponse)
def admin_login(login: LoginRequest):
    """Admin login with hardcoded credentials"""
    if login.username == ADMIN_USERNAME and login.password == ADMIN_PASSWORD:
        return {"token": ADMIN_TOKEN}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/admin/reservations", response_model=List[ReservationResponse])
def get_all_reservations(db: Session = Depends(get_db), _: bool = Depends(require_admin)):
    """Get all reservations (admin only)"""
    reservations = db.query(Reservation).order_by(Reservation.id.desc()).all()
    return reservations

@app.patch("/api/admin/reservations/{reservation_id}", response_model=ReservationResponse)
def update_reservation_status(
    reservation_id: int,
    update: ReservationUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    """Update reservation status (admin only)"""
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    reservation.status = update.status
    db.commit()
    db.refresh(reservation)
    
    return reservation
