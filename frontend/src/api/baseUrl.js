// In dev: Directly point to localhost:3000. Backend handles CORS.
// In production: Use explicit valid URL or fallback to Render URL.
const envUrl = import.meta.env.VITE_BACKEND_URL;
let BASE_URL;

if (import.meta.env.DEV) {
  BASE_URL = 'http://localhost:3000';
} else {
  if (envUrl && envUrl.startsWith('http')) {
    BASE_URL = envUrl.replace(/\/$/, '');
  } else {
    BASE_URL = 'https://quickpay-7rda.onrender.com';
  }
}

export default BASE_URL;
