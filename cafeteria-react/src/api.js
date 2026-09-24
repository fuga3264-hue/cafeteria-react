import axios from 'axios';

// Toma la variable de entorno de Vercel o usa localhost para pruebas locales
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL
});