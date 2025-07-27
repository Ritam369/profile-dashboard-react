
import { authService } from './authService';
import { cloudinaryService } from './cloudinaryService';

// Service for profile-related API calls and logic
export const profileService = {
  // Fetch the current user's profile
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      return await authService.verifyToken(token);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error(error.message || 'Failed to fetch profile');
    }
  },

  // Update the user's profile data
  async updateProfile(userId, profileData) {
    try {
      if (!userId || !profileData) {
        throw new Error('Invalid profile data');
      }
      return await authService.updateProfile(userId, profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  },

  // Upload a new profile image and update the user's profile
  async uploadProfileImage(userId, imageFile) {
    try {
      if (!userId || !imageFile) {
        throw new Error('Invalid upload data');
      }

      // Upload image to Cloudinary
      const uploadResult = await cloudinaryService.uploadImage(imageFile);

      // Update user profile with new image URL
      await authService.updateProfile(userId, {
        profileImage: uploadResult.secure_url
      });

      return {
        profileImage: uploadResult.secure_url,
        publicId: uploadResult.public_id
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(error.message || 'Failed to upload image');
    }
  },

};

export default profileService;
