import { useState, useEffect } from 'react';
import { getAllReservations, patchReservation } from '../api';

function ReservationList({ token }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllReservations(token);
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      await patchReservation(id, status, token);
      fetchReservations(); // Refresh list
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading reservations...</div>;
  }

  if (error) {
    return <div className="message error">{error}</div>;
  }

  return (
    <div>
      <h3>All Reservations ({reservations.length})</h3>
      {reservations.length === 0 ? (
        <p style={{ color: '#666' }}>No reservations yet.</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Table</th>
              <th>Party Size</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.customer_name}</td>
                <td>{res.contact}</td>
                <td>T{res.table_id}</td>
                <td>{res.party_size}</td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>
                  <span className={`status-badge status-${res.status}`}>
                    {res.status}
                  </span>
                </td>
                <td>
                  {res.status !== 'approved' && (
                    <button
                      className="btn btn-success btn-small"
                      onClick={() => handleStatusChange(res.id, 'approved')}
                    >
                      Approve
                    </button>
                  )}
                  {res.status !== 'rejected' && (
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleStatusChange(res.id, 'rejected')}
                    >
                      Reject
                    </button>
                  )}
                  {res.status !== 'canceled' && (
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => handleStatusChange(res.id, 'canceled')}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReservationList;
