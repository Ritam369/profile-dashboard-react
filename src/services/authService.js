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

// Demo users for development (remove in production)
const demoUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 123-4567',
    bio: 'Software developer passionate about creating amazing user experiences.',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15T00:00:00Z',
    isVerified: true,
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 987-6543',
    bio: 'UI/UX designer with a passion for user-centered design.',
    location: 'New York, NY',
    joinDate: '2023-02-20T00:00:00Z',
    isVerified: true,
  }
];

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
      // In production, replace with actual API call:
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = demoUsers.find(u => u.email === email);
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const token = generateToken(user._id);
      return {
        user: sanitizeUser(user),
        token,
        message: 'Login successful'
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  // Register new user
  async register(userData) {
    try {
      // In production, replace with actual API call:
      // const response = await api.post('/auth/register', userData);
      // return response.data;
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (demoUsers.find(u => u.email === userData.email)) {
        throw new Error('User with this email already exists');
      }
      
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        profileImage: null,
        phone: userData.phone || '',
        bio: userData.bio || '',
        location: userData.location || '',
        joinDate: new Date().toISOString(),
        isVerified: false,
      };
      
      demoUsers.push(newUser);
      const token = generateToken(newUser._id);
      
      return {
        user: sanitizeUser(newUser),
        token,
        message: 'Registration successful'
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  // Verify token and get user data
  async verifyToken(token) {
    try {
      // In production, replace with actual API call:
      // const response = await api.get('/auth/verify');
      // return response.data.user;
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const tokenParts = token.split('_');
      if (tokenParts.length < 3) {
        throw new Error('Invalid token format');
      }
      
      const userId = tokenParts[2];
      const user = demoUsers.find(u => u._id === userId);
      
      if (!user) {
        throw new Error('Invalid token');
      }
      
      return sanitizeUser(user);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      // In production, replace with actual API call:
      // const response = await api.put(`/users/${userId}`, updateData);
      // return response.data;
      
      // Demo implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userIndex = demoUsers.findIndex(u => u._id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      demoUsers[userIndex] = { 
        ...demoUsers[userIndex], 
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      return sanitizeUser(demoUsers[userIndex]);
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
