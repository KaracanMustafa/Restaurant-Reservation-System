import { useState, useEffect } from 'react';
import Customer from './pages/Customer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('customer');
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setActiveTab('admin-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setActiveTab('customer');
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🍽️ Restaurant Table Reservation System</h1>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveTab('customer')}
          >
            Customer
          </button>
          {!token && (
            <button
              className={`tab-btn ${activeTab === 'admin-login' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin-login')}
            >
              Admin Login
            </button>
          )}
          {token && (
            <>
              <button
                className={`tab-btn ${activeTab === 'admin-dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin-dashboard')}
              >
                Admin Dashboard
              </button>
              <button className="tab-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="content">
        {activeTab === 'customer' && <Customer />}
        {activeTab === 'admin-login' && <AdminLogin onLogin={handleLogin} />}
        {activeTab === 'admin-dashboard' && token && <AdminDashboard token={token} />}
      </div>
    </div>
  );
}

export default App;
