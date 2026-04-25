const API_BASE_URL = (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname.startsWith('192.168.')
)
  ? 'http://localhost:5000' 
  : 'https://vansugandh.onrender.com';

export default API_BASE_URL;
