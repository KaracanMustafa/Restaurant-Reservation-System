import { useState } from 'react';
import { createReservation } from '../api';

function ReservationForm({ formData, selectedTable, onComplete }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        table_id: selectedTable,
      };
      await createReservation(payload);
      setMessage('Rezervasyon talebiniz alındı (pending).');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-form">
      <h3>Confirm Reservation - Table T{selectedTable}</h3>

      <div style={{ marginBottom: '15px' }}>
        <p><strong>Name:</strong> {formData.customer_name}</p>
        <p><strong>Contact:</strong> {formData.contact}</p>
        <p><strong>Party Size:</strong> {formData.party_size}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Time:</strong> {formData.time}</p>
      </div>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      <button
        onClick={handleSubmit}
        className="btn btn-success"
        disabled={loading || message}
      >
        {loading ? 'Submitting...' : 'Confirm Reservation'}
      </button>
    </div>
  );
}

export default ReservationForm;
