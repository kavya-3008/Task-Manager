// API configuration for different environments
const isDevelopment = import.meta.env.DEV;

// Base URL for API calls
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : 'https://your-backend-url.com/api'; // Update this with your actual backend URL

// Axios configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}; 