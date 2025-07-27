
// ProfileDashboard: Main user profile page with view and edit functionality
import React, { useState } from 'react';
import { 
  Edit3, Mail, Phone, MapPin, Calendar, CheckCircle, User, Loader, AlertCircle, ArrowLeft 
} from 'lucide-react';
import useProfile from '../hooks/useProfile';
import ProfileImageUpload from '../components/ProfileImageUpload';
import ProfileEditForm from '../components/ProfileEditForm';


const ProfileDashboard = ({ onBack }) => {
  // Get profile data and actions from custom hook
  const { profile, loading, error, uploading, updateProfile, uploadProfileImage } = useProfile();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Handle profile image upload
  const handleImageUpload = async (imageFile) => {
    try {
      await uploadProfileImage(imageFile);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  // Handle profile update (edit form)
  const handleProfileUpdate = async (profileData) => {
    try {
      setUpdating(true);
      await updateProfile(profileData);
      setShowEditForm(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3 text-primary-600">
          <Loader className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading your profile...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md mx-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No profile found state
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md mx-4">
          <div className="text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Profile Found
            </h2>
            <p className="text-gray-600">Unable to load profile data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            )}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Profile Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your personal information and account settings
              </p>
            </div>
          </div>

          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                <ProfileImageUpload
                  currentImage={profile.profileImage}
                  onImageUpload={handleImageUpload}
                  uploading={uploading}
                  defaultAvatarUrl={
                    !profile.profileImage
                      ? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.firstName + ' ' + profile.lastName) + '&background=0D8ABC&color=fff&size=128'
                      : undefined
                  }
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h2>
                      {profile.isVerified && (
                        <CheckCircle className="w-6 h-6 text-primary-500" />
                      )}
                    </div>
                    <p className="text-gray-600">{profile.bio || 'No bio available'}</p>
                  </div>
                  <button
                    onClick={() => setShowEditForm(true)}
                    className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                  </div>

                  {profile.phone && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{profile.phone}</p>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{profile.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(profile.joinDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Complete</h3>
              <p className="text-gray-600">Your profile is looking great!</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Verified Account</h3>
              <p className="text-gray-600">
                {profile.isVerified ? 'Your account is verified' : 'Verification pending'}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Contact Ready</h3>
              <p className="text-gray-600">All contact info is up to date</p>
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <ProfileEditForm
          profile={profile}
          onSave={handleProfileUpdate}
          onCancel={() => setShowEditForm(false)}
          loading={updating}
        />
      )}
    </div>
  );
};

export default ProfileDashboard;
