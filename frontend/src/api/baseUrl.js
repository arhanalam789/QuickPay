// In dev: Vite proxy handles /api → localhost:3000 so BASE_URL can be empty.
// In production: VITE_BACKEND_URL must point to Render backend.
// Fallback to hardcoded Render URL so the app works even if env var is missing on Vercel.
const BASE_URL = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')
  : import.meta.env.DEV
    ? ''
    : 'https://quickpay-7rda.onrender.com';

export default BASE_URL;
