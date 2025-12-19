import { useState } from 'react';
import TableGrid from '../components/TableGrid';
import ReservationForm from '../components/ReservationForm';
import { getAvailability } from '../api';

function Customer() {
  const [formData, setFormData] = useState({
    customer_name: '',
    contact: '',
    party_size: 2,
    date: '',
    time: '',
  });
  const [availability, setAvailability] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    setError('');
    setSelectedTable(null);

    if (!formData.date || !formData.time) {
      setError('Please select date and time');
      return;
    }

    setLoading(true);
    try {
      const data = await getAvailability(formData.date, formData.time);
      setAvailability(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleReservationComplete = () => {
    // Reset form after successful reservation
    setAvailability(null);
    setSelectedTable(null);
    setFormData({
      customer_name: '',
      contact: '',
      party_size: 2,
      date: '',
      time: '',
    });
  };

  return (
    <div>
      <h2>Make a Reservation</h2>

      <form onSubmit={handleCheckAvailability}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact (Phone):</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Party Size:</label>
          <input
            type="number"
            name="party_size"
            value={formData.party_size}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Checking...' : 'Check Availability'}
        </button>
      </form>

      {error && <div className="message error">{error}</div>}

      {availability && (
        <div>
          <h3>Available Tables</h3>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Click on a green table to make a reservation
          </p>
          <TableGrid availability={availability} onTableSelect={handleTableSelect} />
        </div>
      )}

      {selectedTable && (
        <ReservationForm
          formData={formData}
          selectedTable={selectedTable}
          onComplete={handleReservationComplete}
        />
      )}
    </div>
  );
}

export default Customer;
