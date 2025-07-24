import axios from 'axios';

// Configure base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add auth token to requests
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

// Response interceptor for handling errors
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

// Demo users removed. All operations now use backend API.

// Utility functions
const generateToken = (userId) => `demo_token_${userId}_${Date.now()}`;
const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

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

  // Verify token and get user data
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
      const response = await api.put(`/users/${userId}`, updateData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout
  async logout() {
    try {
      // In production, you might want to invalidate the token on the server:
      // await api.post('/auth/logout');
      
      return { message: 'Logout successful' };
    } catch (error) {
      // Don't throw error for logout - always allow user to logout locally
      return { message: 'Logout successful' };
    }
  }
};

export default authService;
