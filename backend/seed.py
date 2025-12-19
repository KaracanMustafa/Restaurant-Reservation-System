from db import engine, SessionLocal, Base
from models import Table, Reservation

def seed_database():
    """Create tables and seed initial data"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if tables already exist
        existing_count = db.query(Table).count()
        if existing_count == 0:
            # Create 10 tables (T1 to T10)
            tables = [Table(id=i, name=f"T{i}") for i in range(1, 11)]
            db.add_all(tables)
            db.commit()
            print("✓ Created 10 tables (T1-T10)")
            
            # Add 2 sample reservations
            sample_reservations = [
                Reservation(
                    table_id=1,
                    customer_name="Ahmet Yılmaz",
                    contact="+90 555 123 4567",
                    party_size=4,
                    date="2025-11-15",
                    time="19:00",
                    status="pending"
                ),
                Reservation(
                    table_id=3,
                    customer_name="Ayşe Demir",
                    contact="+90 555 987 6543",
                    party_size=2,
                    date="2025-11-15",
                    time="20:00",
                    status="approved"
                )
            ]
            db.add_all(sample_reservations)
            db.commit()
            print("✓ Added 2 sample reservations")
        else:
            print(f"✓ Database already seeded ({existing_count} tables exist)")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
    print("\n✓ Database setup complete!")
