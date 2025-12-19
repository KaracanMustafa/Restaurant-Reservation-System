from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Table(Base):
    __tablename__ = "tables"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    
    reservations = relationship("Reservation", back_populates="table")

class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    table_id = Column(Integer, ForeignKey("tables.id"), nullable=False)
    customer_name = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    party_size = Column(Integer, nullable=False)
    date = Column(String, nullable=False)  # YYYY-MM-DD
    time = Column(String, nullable=False)  # HH:MM
    status = Column(String, nullable=False)  # pending, approved, rejected, canceled
    
    table = relationship("Table", back_populates="reservations")
