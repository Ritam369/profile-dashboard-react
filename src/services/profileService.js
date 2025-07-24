import axios from 'axios';
import { authService } from './authService';
import { cloudinaryService } from './cloudinaryService';

// Configure base URL - you'll need to replace this with your actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock user data for development (replace with actual API calls)
const mockUser = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Software developer passionate about creating amazing user experiences.',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  location: 'San Francisco, CA',
  joinDate: '2023-01-15',
  isVerified: true,
};

export const profileService = {
  // Get user profile (now uses auth service)
  async getProfile(userId) {
    try {
      // Use auth service to get current user data
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const userData = await authService.verifyToken(token);
      return userData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const updatedUser = await authService.updateProfile(userId, profileData);
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Upload profile image using Cloudinary
  async uploadProfileImage(userId, imageFile) {
    try {
      // First upload to Cloudinary
      const cloudinaryResult = await cloudinaryService.uploadImage(imageFile);
      
      // Then update user profile with new image URL
      const updatedUser = await authService.updateProfile(userId, {
        profileImage: cloudinaryResult.secure_url
      });
      
      return { profileImage: cloudinaryResult.secure_url };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete user profile
  async deleteProfile(userId) {
    try {
      // const response = await api.delete(`/users/${userId}`);
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 500);
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  }
};

export default profileService;
