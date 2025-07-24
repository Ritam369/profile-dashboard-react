import express from 'express';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.put('/:id', updateProfile);

export default router;
