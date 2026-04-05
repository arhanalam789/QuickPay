// Base URL for all API calls.
// In dev, Vite proxy handles /api -> localhost:3000, so we use empty string.
// In production on Vercel, VITE_BACKEND_URL points to the Render backend.
const BASE_URL = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '') // strip trailing slash
  : '';

export default BASE_URL;
