const API_BASE_URL = 'http://localhost:8000';

async function fetchJson(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Request failed');
  }

  return data;
}

export async function getAvailability(date, time) {
  return fetchJson(`/api/availability?date=${date}&time=${time}`);
}

export async function createReservation(payload) {
  return fetchJson('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminLogin(username, password) {
  return fetchJson('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function getAllReservations(token) {
  return fetchJson('/api/admin/reservations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function patchReservation(id, status, token) {
  return fetchJson(`/api/admin/reservations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
