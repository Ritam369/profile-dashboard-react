
// ProfileImageUpload: Handles profile image upload, drag-and-drop, and preview
import React, { useRef, useState } from "react";
import { Camera, Upload, Loader } from "lucide-react";
import { cloudinaryService } from "../services/cloudinaryService";

const ProfileImageUpload = ({ currentImage, onImageUpload, uploading = false, defaultAvatarUrl }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // Handle file selection (from input or drop)
  const handleFileSelect = (file) => {
    try {
      cloudinaryService.validateImage(file);
      onImageUpload(file);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (defaultAvatarUrl && defaultAvatarUrl.includes('name=')) {
      const match = decodeURIComponent(defaultAvatarUrl.split('name=')[1].split('&')[0] || '').split(' ');
      return (match[0]?.[0] || '') + (match[1]?.[0] || '');
    }
    return '?';
  };

  return (
    <div className="relative group">
      <div className="relative w-32 h-32">
        {/* Profile image or initials avatar */}
        {currentImage ? (
          <img crossOrigin="anonymous"
            src={currentImage}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg select-none">
            {getInitials()}
          </div>
        )}

        {/* Overlay for drag-and-drop and change action */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer ${dragOver ? 'opacity-100 bg-opacity-60' : ''}`}
          onClick={triggerFileInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <Loader className="w-8 h-8 text-white animate-spin" />
          ) : (
            <div className="flex flex-col items-center text-white">
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-xs">Change</span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload button */}
      <button
        onClick={triggerFileInput}
        disabled={uploading}
        className="mt-3 flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Upload className="w-4 h-4" />
        <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
      </button>

      {/* Info text */}
      <p className="mt-2 text-xs text-gray-500">
        Supports JPG, PNG up to 5MB
      </p>
    </div>
  );
};

export default ProfileImageUpload;
