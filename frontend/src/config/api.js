// Configuración de la API
// PASO 1: Usar URL de Railway en producción, localhost en desarrollo
// Usar window.location.hostname para detección confiable en tiempo de ejecución
const getApiBaseUrl = () => {
  // Si estamos en GitHub Pages (producción), usar Railway
  if (window.location.hostname === 'heiner2001.github.io') {
    return 'https://web-production-61c3.up.railway.app';
  }
  // Si hay variable de entorno, usarla
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // En desarrollo, usar localhost
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true, // Para incluir cookies en las peticiones
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_CONFIG;

