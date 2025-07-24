import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const deleteProfile = async () => {
    try {
      setError(null);
      const result = await profileService.deleteProfile(user._id);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to delete profile');
      throw err;
    }
  };

  return {
    profile: user,
    loading,
    error,
    uploading,
    updateProfile,
    uploadProfileImage,
    deleteProfile,
  };
};

export default useProfile;
