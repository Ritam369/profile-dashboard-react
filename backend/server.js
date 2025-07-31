import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';
import errorHandler from './src/middleware/errorHandler.js';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';
import cloudinaryRoutes from "./src/routes/cloudinary.js";
import pdfRoutes from './src/routes/pdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static PDF files
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use('/api/pdf', pdfRoutes);

// Error handling middleware (must be after all other middleware and routes)
app.use(errorHandler);

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
