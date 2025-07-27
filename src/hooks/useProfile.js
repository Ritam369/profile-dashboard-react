
// Custom hook for profile actions and state
import { useState } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Update profile details
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedProfile = await profileService.updateProfile(user._id, profileData);
      updateUser(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload a new profile image
  const uploadProfileImage = async (imageFile) => {
    try {
      setUploading(true);
      setError(null);
      const result = await profileService.uploadProfileImage(user._id, imageFile);
      updateUser({ profileImage: result.profileImage });
      return result;
    } catch (err) {
      setError(err.message || 'Failed to upload image');
      throw err;
    } finally {
      setUploading(false);
    }
  };


  // Return profile state and actions
  return {
    profile: user,
    loading,
    error,
    uploading,
    updateProfile,
    uploadProfileImage,
  };
};

export default useProfile;
