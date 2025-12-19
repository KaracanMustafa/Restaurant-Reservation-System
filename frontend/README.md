# Frontend - Restaurant Reservation System

React + Vite frontend application.

## Setup & Run

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev -- --port 5173
```

The application will be available at http://localhost:5173

## Features

### Customer View
- Enter reservation details (name, contact, party size, date, time)
- Check table availability
- View available tables in a grid (T1-T10)
- Select an available table and confirm reservation
- Reservations are created with "pending" status

### Admin View
- Login with credentials (admin / admin123)
- View all reservations in a table
- Approve, reject, or cancel reservations
- See reservation details (customer info, table, date, time, status)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
