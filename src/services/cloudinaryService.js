// Cloudinary service for image uploads
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryService = {
  // Upload image to Cloudinary
  async uploadImage(file) {
    try {
      // Validate file
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Image size should be less than 5MB');
      }

      // For demo purposes, create a local URL
      // In production, you would upload to Cloudinary
      const imageUrl = URL.createObjectURL(file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        secure_url: imageUrl,
        public_id: `demo_${Date.now()}`,
        format: file.type.split('/')[1],
        bytes: file.size,
        width: 400,
        height: 400
      };

      // Real Cloudinary implementation:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'profile_images');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      return data;
      */
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },

  // Delete image from Cloudinary
  async deleteImage(publicId) {
    try {
      // For demo purposes, just return success
      await new Promise(resolve => setTimeout(resolve, 500));
      return { result: 'ok' };

      // Real Cloudinary implementation would require server-side deletion
      // as it needs API secret which shouldn't be exposed in frontend
      /*
      // This would be done on your backend server
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
      */
    } catch (error) {
      console.error('Image deletion error:', error);
      throw error;
    }
  },

  // Generate optimized image URL
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

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
  },

  // Validate image file
  validateImage(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      throw new Error('No file selected');
    }

    if (!validTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
    }

    if (file.size > maxSize) {
      throw new Error('Image size should be less than 5MB');
    }

    return true;
  }
};

export default cloudinaryService;
