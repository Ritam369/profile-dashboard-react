
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const cloudinaryService = {
  // Upload an image to Cloudinary 
  async uploadImage(file) {
    this.validateImage(file);
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary is not configured. Please set the required environment variables.');
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
  },



  // Generate an optimized Cloudinary image URL
  generateOptimizedUrl(publicId, options = {}) {
    if (!CLOUDINARY_CLOUD_NAME || !publicId) {
      return null;
    }
    const {
      width = 300,
      height = 300,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
  },

  // Validate image file type and size
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

  // Check if Cloudinary is configured
  isConfigured() {
    return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
  }
};

export default cloudinaryService;
