import React, { useRef, useState } from 'react';
import { Camera, Upload, Loader } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinaryService';

const ProfileImageUpload = ({ currentImage, onImageUpload, uploading = false }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    try {
      cloudinaryService.validateImage(file);
      onImageUpload(file);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group">
      <div className="relative w-32 h-32">
        {/* Profile Image */}
        <img
          src={currentImage || 'https://via.placeholder.com/150x150/e2e8f0/64748b?text=No+Image'}
          alt="Profile"
          className="profile-image"
        />
        
        {/* Upload Overlay */}
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

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Button for Mobile/Accessibility */}
      <button
        onClick={triggerFileInput}
        disabled={uploading}
        className="mt-3 flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Upload className="w-4 h-4" />
        <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
      </button>

      {/* File Format Info */}
      <p className="mt-2 text-xs text-gray-500">
        Supports JPG, PNG up to 5MB
      </p>
    </div>
  );
};

export default ProfileImageUpload;
