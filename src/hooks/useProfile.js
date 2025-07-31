
// Custom hook for profile actions and state
import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfs, setPdfs] = useState([]); // Store user's PDFs

  // Fetch user's PDFs
  useEffect(() => {
    if (user) {
      const fetchPdfs = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/pdf/user/${user._id}`);
          setPdfs(response.data.pdfs || []);
        } catch (err) {
          // If 404, it means no PDFs exist yet, which is normal
          if (err.response && err.response.status === 404) {
            setPdfs([]);
          } else {
            console.error('Failed to fetch PDFs:', err);
            // Don't set error for PDF fetching as it's not critical
            setPdfs([]);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchPdfs();
    }
  }, [user]);

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

  // Refresh PDFs list
  const refreshPdfs = async () => {
    if (user) {
      try {
        const response = await api.get(`/pdf/user/${user._id}`);
        setPdfs(response.data.pdfs || []);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPdfs([]);
        } else {
          console.error('Failed to refresh PDFs:', err);
          setPdfs([]);
        }
      }
    }
  };

  // Return profile state and actions
  return {
    profile: user,
    loading,
    error,
    uploading,
    pdfs,
    updateProfile,
    uploadProfileImage,
    refreshPdfs,
  };
};

export default useProfile;
