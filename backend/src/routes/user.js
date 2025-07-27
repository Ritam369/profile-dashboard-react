
// User routes
import express from 'express';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Update profile route
router.put('/profile/:id', updateProfile);

export default router;
