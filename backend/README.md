# Backend API

This is the backend API for the Profile Dashboard application, built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── database.js   # Database connection
│   ├── controllers/      # Route controllers
│   │   ├── authController.js # Logic for user authentication
│   │   └── userController.js # Logic for user profile operations
│   ├── middleware/       # Custom middleware
│   │   └── errorHandler.js # Global Error Handling
│   ├── models/           # Database models
│   │   └── User.js   # Mongoose User schema
│   ├── routes/           # Route definitions
│   │   ├── auth.js  # Authentication routes
|   |   ├── cloudinary.js # Cloudinary configuration
│   │   ├── pdf.js    # PDF generation routes
│   │   └── user.js  # User profile routes
├── .env.example          # Example environment variables
├── package-lock.json
├── package.json
├── README.md
└── server.js             # Application entry point
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend directory based on `.env.example` and update the values:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify authentication token

### Users
- `PUT /api/users/profile/:id` - Update user profile

### Cloudinary
- `DELETE /api/cloudinary/delete` - Delete image from Cloudinary (Note: This is a placeholder and not fully implemented)

> **Note:** The API base URL is `/api` (not `/api/v1` as previously documented). Some endpoints mentioned in the frontend documentation may not be fully implemented in the backend yet.

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "status": 400,
  "message": "Error message"
}
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
