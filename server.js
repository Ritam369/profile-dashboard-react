
// Main server entry for backend
import express from 'express';
import connectDB from './backend/src/config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';
import cloudinaryRoutes from './src/routes/cloudinary.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);         // Auth endpoints
app.use('/api/users', userRoutes);        // User profile endpoints
app.use('/api/cloudinary', cloudinaryRoutes); // Cloudinary image endpoints

const PORT = process.env.PORT || 5000;


// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
