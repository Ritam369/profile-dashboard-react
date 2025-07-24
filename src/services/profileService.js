import { authService } from './authService';
import { cloudinaryService } from './cloudinaryService';

export const profileService = {
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

  async uploadProfileImage(userId, imageFile) {
    try {
      if (!userId || !imageFile) {
        throw new Error('Invalid upload data');
      }

      const uploadResult = await cloudinaryService.uploadImage(imageFile);
      
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

  async deleteProfile(userId) {
    try {
      
      console.warn('Delete profile not implemented in demo mode');
      return { success: true, message: 'Profile deletion not available in demo' };
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw new Error(error.message || 'Failed to delete profile');
    }
  }
};

export default profileService;
