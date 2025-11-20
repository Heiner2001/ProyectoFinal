// Configuración de la API
// PASO 1: Usar URL de Railway en producción, localhost en desarrollo
const API_BASE_URL = import.meta.env.PROD 
  ? "https://web-production-61c3.up.railway.app" 
  : "http://localhost:8000";

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true, // Para incluir cookies en las peticiones
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_CONFIG;

