import axios from 'axios';

// Configure base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock users database (replace with real backend)
const mockUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123', // In real app, this would be hashed
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 123-4567',
    bio: 'Software developer passionate about creating amazing user experiences.',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
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
    joinDate: '2023-02-20',
    isVerified: true,
  }
];

// Generate mock JWT token
const generateMockToken = (userId) => {
  return `mock_token_${userId}_${Date.now()}`;
};

// Extract user data without password
const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

export const authService = {
  // Login user
  async login(email, password) {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const token = generateMockToken(user._id);
      const sanitizedUser = sanitizeUser(user);
      
      return {
        user: sanitizedUser,
        token,
        message: 'Login successful'
      };
      
      // Real implementation would be:
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
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
      
      // Add to mock database
      mockUsers.push(newUser);
      
      const token = generateMockToken(newUser._id);
      const sanitizedUser = sanitizeUser(newUser);
      
      return {
        user: sanitizedUser,
        token,
        message: 'Registration successful'
      };
      
      // Real implementation would be:
      // const response = await api.post('/auth/register', userData);
      // return response.data;
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Verify token and get user data
  async verifyToken(token) {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Extract user ID from mock token
      const userId = token.split('_')[2];
      const user = mockUsers.find(u => u._id === userId);
      
      if (!user) {
        throw new Error('Invalid token');
      }
      
      return sanitizeUser(user);
      
      // Real implementation would be:
      // const response = await api.get('/auth/verify', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // return response.data.user;
      
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userIndex = mockUsers.findIndex(u => u._id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user data
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };
      
      return sanitizeUser(mockUsers[userIndex]);
      
      // Real implementation would be:
      // const response = await api.put(`/auth/profile/${userId}`, updateData);
      // return response.data;
      
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  // Logout (mainly for cleanup)
  async logout() {
    try {
      // Clear any server-side sessions if needed
      // await api.post('/auth/logout');
      
      // Remove token from localStorage (done in AuthContext)
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout - always allow user to logout locally
      return { message: 'Logout successful' };
    }
  }
};

export default authService;
