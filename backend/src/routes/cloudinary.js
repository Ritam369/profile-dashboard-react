
// Cloudinary routes (placeholder)
import express from 'express';

const router = express.Router();

// Delete image route (not implemented)
router.delete('/delete', (req, res) => {
  res.status(501).json({ message: 'Image deletion from Cloudinary should be handled securely on the backend with authentication.' });
});

export default router;
