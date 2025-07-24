const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export const cloudinaryService = {
  async uploadImage(file) {
    try {
      this.validateImage(file);

      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        console.warn('Cloudinary not configured, using demo mode');
        return this.uploadImageDemo(file);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'profile_images');
      
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

  async uploadImageDemo(file) {
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

  async deleteImage(publicId) {
    try {
      if (!CLOUDINARY_CLOUD_NAME) {
      }

      const response = await fetch('/api/cloudinary/delete', {
        method: 'DELETE',
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
      return { result: 'ok' };
    }
  },

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

  },

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

  isConfigured() {
    return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
  }
};

export default cloudinaryService;
