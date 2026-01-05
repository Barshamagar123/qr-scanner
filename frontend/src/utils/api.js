import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const userAPI = {
  // Create new user
  createUser: (userData) => api.post('/users', userData),
  
  // Get user by ID
  getUser: (id) => api.get(`/users/${id}`),
  
  // Get all users
  getAllUsers: () => api.get('/users'),
};

// QR Code APIs
export const qrAPI = {
  // Generate QR code
  generateQR: (userId) => api.post('/qr/generate', { userId }),
  
  // Scan QR code
  scanQR: (qrCodeId) => api.get(`/qr/scan/${qrCodeId}`),
  
  // Get QR details
  getQRDetails: (qrCodeId) => api.get(`/qr/${qrCodeId}`),
  
  // Download QR
  downloadQR: (qrCodeId) => api.get(`/qr/download/${qrCodeId}`, {
    responseType: 'blob'
  }),
};

// Health check
export const healthCheck = () => api.get('/health');