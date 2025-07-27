
// Auth service for API calls related to authentication and user profile
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data?.message || 'Server error occurred');
  } else if (error.request) {
    throw new Error('Network error - please check your connection');
  } else {
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Verify JWT token and get user
  async verifyToken(token) {
    try {
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const response = await api.put(`/users/profile/${userId}`, updateData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout user 
  async logout() {
    try {
      return { message: 'Logout successful' };
    } catch (error) {
      return { message: 'Logout successful' };
    }
  }
};

export default authService;
