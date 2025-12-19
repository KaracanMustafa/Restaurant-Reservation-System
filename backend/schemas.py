from pydantic import BaseModel, Field

class ReservationCreate(BaseModel):
    customer_name: str = Field(..., min_length=1)
    contact: str = Field(..., min_length=1)
    party_size: int = Field(..., ge=1)
    date: str = Field(..., min_length=1)
    time: str = Field(..., min_length=1)
    table_id: int = Field(..., ge=1, le=10)

class ReservationResponse(BaseModel):
    id: int
    table_id: int
    customer_name: str
    contact: str
    party_size: int
    date: str
    time: str
    status: str
    
    class Config:
        from_attributes = True

class ReservationUpdate(BaseModel):
    status: str = Field(..., pattern="^(approved|rejected|canceled)$")

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    token: str

class AvailabilityResponse(BaseModel):
    table_id: int
    available: bool
    status: str = "available"  # available, pending, approved
