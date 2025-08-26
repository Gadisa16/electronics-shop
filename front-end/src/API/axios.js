import axios from 'axios';

const  local_baseURL = import.meta.env.VITE_API_BASE_URL_LOCAL;
const  prod_baseURL = import.meta.env.VITE_API_BASE_URL_PROD;

// Determine the baseURL dynamically
const getBaseURL = () => {
  // Check if running in a browser environment
  if (typeof window !== 'undefined') {
    // Use localhost for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return local_baseURL; // Local server
    }
    return prod_baseURL; // Deployed server
  }
  // Fallback for non-browser environments (e.g., server-side rendering)
  return process.env.NODE_ENV === 'development'
    ? local_baseURL
    : prod_baseURL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

export { axiosInstance };