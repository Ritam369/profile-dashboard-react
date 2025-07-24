import express from 'express';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.put('/profile/:id', updateProfile);

export default router;
