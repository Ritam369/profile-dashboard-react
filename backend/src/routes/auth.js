
// Auth routes
import express from 'express';
import { register, login, verify } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Verify token route
router.get('/verify', verify);

export default router;
