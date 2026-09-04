/**
 * ===============================================================
 * API SERVICE HELPER
 * ===============================================================
 * Student-friendly HTTP client for connecting frontend to backend.
 * Automatically injects the JWT auth token from localStorage if present.
 * ===============================================================
 */

// Dynamically determine the backend API base URL
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // In a deployed browser environment (e.g., on Vercel or any non-localhost host)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // If env variable is missing or accidentally set to localhost in Vercel settings, fall back to relative /api
    if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
      return '/api';
    }
  }

  if (envUrl) {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }

  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();


/**
 * Standard fetch wrapper with JSON parsing and Authorization header
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('agri_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
