// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Image validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export const cloudinaryService = {
  // Upload image to Cloudinary
  async uploadImage(file) {
    try {
      // Validate file
      this.validateImage(file);

      // Check if Cloudinary is configured
      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        console.warn('Cloudinary not configured, using demo mode');
        return this.uploadImageDemo(file);
      }

      // Real Cloudinary implementation
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'profile_images');
      formData.append('transformation', 'c_fill,w_400,h_400,q_auto,f_auto');
      
      const response = await fetch(CLOUDINARY_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to upload image');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },

  // Demo upload for development
  async uploadImageDemo(file) {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const imageUrl = URL.createObjectURL(file);
    return {
      secure_url: imageUrl,
      public_id: `demo_${Date.now()}`,
      format: file.type.split('/')[1],
      bytes: file.size,
      width: 400,
      height: 400
    };
  },

  // Delete image from Cloudinary
  async deleteImage(publicId) {
    try {
      if (!CLOUDINARY_CLOUD_NAME) {
        return { result: 'ok' }; // Demo mode
      }

      // In production, this should be done on the backend
      // as it requires the API secret which shouldn't be exposed
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ publicId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      return await response.json();
    } catch (error) {
      console.error('Image deletion error:', error);
      // Don't throw error for deletion - it's not critical
      return { result: 'ok' };
    }
  },

  // Generate optimized image URL
  generateOptimizedUrl(publicId, options = {}) {
    if (!CLOUDINARY_CLOUD_NAME || !publicId || publicId.startsWith('demo_')) {
      return null;
    }

    const {
      width = 300,
      height = 300,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options;

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
  },

  // Validate image file
  validateImage(file) {
    if (!file) {
      throw new Error('No file selected');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Image size should be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }

    return true;
  },

  // Check if Cloudinary is properly configured
  isConfigured() {
    return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
  }
};

export default cloudinaryService;
