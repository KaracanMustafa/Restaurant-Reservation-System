# 🍽️ Restaurant Table Reservation System

A full-stack restaurant reservation management system built with FastAPI and React.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## ✨ Features

### Customer Interface
- 📅 View table availability by date and time
- 🪑 Interactive table selection with visual grid
- 📝 Create and submit reservation requests
- ✅ Real-time reservation status tracking

### Admin Dashboard
- 🔐 Secure authentication system
- 📊 Comprehensive reservation management
- ✓ Approve, reject, or cancel reservations
- 👥 View all customer requests
- 📈 Filter and sort reservations

### Technical Features
- 💾 SQLite database persistence
- 🔄 RESTful API with FastAPI
- ⚡ Fast and responsive React UI
- 🎨 Modern UI with Tailwind CSS-like styling

## 🛠️ Tech Stack

**Backend:**
- Python 3.x
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

**Frontend:**
- React 18
- Vite
- Axios
- Modern CSS

## 📸 Screenshots

### Customer View
![WhatsApp Image 2025-12-14 at 16 21 55 (2)](https://github.com/user-attachments/assets/fa0b9489-1d80-4e00-8a9f-e9ce950d3e9e)


### Admin Dashboard
![WhatsApp Image 2025-12-14 at 16 21 54 (2)](https://github.com/user-attachments/assets/03ea4522-0a85-4bdc-be93-f03fbb3fd395)


### Admin Login
![WhatsApp Image 2025-12-14 at 16 21 55 (1)](https://github.com/user-attachments/assets/1775f97b-ab97-4eeb-8d9c-06f397c5b97f)


### Table Grid
<img width="824" height="386" alt="image" src="https://github.com/user-attachments/assets/5eac1697-2e90-43c4-9936-3e1a6f98a7c4" />


## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
python seed.py  # Initialize database with sample data
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev -- --port 5173
```

### 3. Access the Application
- **Frontend:** http://localhost:5173
- **Backend API Docs:** http://localhost:8000/docs
- **Backend Admin:** http://localhost:8000/admin

## 🔑 Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

## 📁 Project Structure

```
restaurant-reservation/
├── backend/
│   ├── main.py              # FastAPI application & routes
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── db.py                # Database configuration
│   ├── seed.py              # Database seeding script
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ReservationForm.jsx
│   │   │   ├── ReservationList.jsx
│   │   │   └── TableGrid.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Customer.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── api.js           # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md

```

## 📚 API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

### Main Endpoints

**Reservations:**
- `GET /reservations` - Get all reservations
- `POST /reservations` - Create a new reservation
- `PUT /reservations/{id}` - Update reservation status

**Tables:**
- `GET /tables` - Get all tables
- `GET /tables/available` - Check table availability

**Authentication:**
- `POST /admin/login` - Admin login

## 🗄️ Database Schema

The system uses SQLite with the following main entities:

- **Table**: Restaurant tables (T1-T10)
- **Reservation**: Customer reservation requests
- **Admin**: Admin user accounts

## 🔄 Development Workflow

1. Make changes to backend code (auto-reload enabled)
2. Make changes to frontend code (hot-reload enabled)
3. Test API endpoints via Swagger UI
4. Test frontend in browser

## 📝 Notes

- The system includes 10 tables by default (T1-T10)
- Each table has a capacity of 4 people
- Reservations can be in one of these states: pending, approved, rejected, cancelled
- Admin must be logged in to access the dashboard

## 🚧 Future Enhancements

- [ ] Email notifications for reservation status
- [ ] Table capacity management
- [ ] Multi-restaurant support
- [ ] Reservation time slot management
- [ ] Customer account system
- [ ] Payment integration
- [ ] Reporting and analytics

## 📄 License

This project is open source and available under the MIT License.
