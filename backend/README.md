# Backend - Restaurant Reservation API

FastAPI backend with SQLite database.

## Setup & Run

1. Create virtual environment:
```bash
python -m venv .venv
```

2. Activate virtual environment:
```bash
# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Seed database (creates tables and sample data):
```bash
python seed.py
```

5. Run server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000

## API Documentation

Interactive docs available at: http://localhost:8000/docs

## Endpoints

### Public
- `GET /api/availability?date=YYYY-MM-DD&time=HH:MM` - Check table availability
- `POST /api/reservations` - Create new reservation

### Admin
- `POST /api/admin/login` - Login (username: admin, password: admin123)
- `GET /api/admin/reservations` - List all reservations
- `PATCH /api/admin/reservations/{id}` - Update reservation status

## Database

SQLite file: `reservations.db`
- 10 tables (T1-T10)
- Reservations with status: pending, approved, rejected, canceled
