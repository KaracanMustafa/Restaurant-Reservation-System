import { useState, useEffect } from 'react';
import ReservationList from '../components/ReservationList';

function AdminDashboard({ token }) {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Manage all restaurant reservations
      </p>
      <ReservationList token={token} />
    </div>
  );
}

export default AdminDashboard;
