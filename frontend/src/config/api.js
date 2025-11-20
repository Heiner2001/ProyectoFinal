// Configuración de la API
// Detectar si estamos en GitHub Pages o Railway
 
const getApiBaseUrl = () => {
  const host = window.location.host;
 
  // En producción (GitHub Pages - cualquier subcarpeta)
  if (host.includes('heiner2001.github.io')) {
    return 'https://web-production-61c3.up.railway.app';
  }
 
  // Variable de entorno (útil en desarrollo)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
 
  // Por defecto: servidor local
  return 'http://localhost:8000';
};
 
const API_BASE_URL = getApiBaseUrl();
 
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};
 
export default API_CONFIG;
