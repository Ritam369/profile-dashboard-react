
# Profile Dashboard React

A modern, production-ready profile dashboard application built with React, Tailwind CSS, and MongoDB Atlas. This project follows the MVC (Model-View-Controller) architecture pattern and provides a complete solution for user authentication, profile management, and image uploads with Cloudinary integration.

## Project Structure

The application is structured following the MVC pattern for better separation of concerns and maintainability.




### Frontend (React)
```
src/
├── components/
│   ├── auth/                # Login, Register
│   ├── layout/              # DashboardLayout, Navbar
│   ├── ProfileEditForm.js   # Profile editing form
│   └── ProfileImageUpload.js# Profile image upload
├── context/                 # AuthContext.js
├── hooks/                   # useProfile.js
├── pages/                   # AuthPage.js, ProfileDashboard.js
├── services/                # authService.js, profileService.js, cloudinaryService.js
└── App.js, index.js         # App entry and root
```



### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── config/           # database.js
│   ├── controllers/      # authController.js, userController.js
│   ├── middleware/       # errorHandler.js
│   ├── models/           # User.js
│   ├── routes/           # auth.js, cloudinary.js, user.js
└── server.js             # Application entry point
```

## Features

### Core Architecture
- **MVC Pattern:** Clean separation of concerns with Model-View-Controller architecture
- **Modular Design:** Organized directory structure for better maintainability
- **Environment Configuration:** Easy setup for development and production environments

### Authentication & Security
- **JWT Authentication:** Secure token-based authentication system
- **Protected Routes:** Client and server-side route protection
- **Form Validation:** Client and server-side validation for all user inputs
- **Password Hashing:** Secure password storage using bcrypt

### User Experience
- **Responsive Design:** Fully responsive layout that works on all devices
- **Image Upload:** Drag-and-drop image upload with preview
- **Real-time Updates:** UI updates without page refresh
- **Loading States:** Visual feedback during API requests
- **Error Handling:** User-friendly error messages and validation feedback

### Performance
- **Code Splitting:** React.lazy for optimized bundle sizes
- **Image Optimization:** Cloudinary integration for optimized image delivery
- **Efficient State Management:** React Context API for global state
- **Optimized Builds:** Production-ready builds with minification and compression

## Technology Stack
- **Frontend:** React 19.x, Tailwind CSS 4.x, Lucide React (icons), Axios
- **Backend:** Node.js, Express, MongoDB Atlas, JWT, Cloudinary

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)
- Git (for version control)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/itssoumodip/profile-dashboard-react.git
   cd profile-dashboard-react
   ```
2. **Install frontend dependencies:**
   ```sh
   npm install
   ```
3. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
4. **Configure environment variables:**
   - In the project root, create a `.env` file based on `.env.example` for frontend variables.
   - In the `backend` folder, create a `.env` file based on `.env.example` for backend variables.
   - Configure the following required environment variables:
     - Frontend: `REACT_APP_API_URL` (points to your backend API)
     - Backend: 
       - `MONGODB_URI` (MongoDB connection string)
       - `JWT_SECRET` (for JWT token signing)
       - `CLOUDINARY` related credentials

## Running the Project

1. **Start the backend server:**
   ```sh
   # In the backend directory
   cd backend
   npm install
   npm run dev
   ```
   - The backend server will start on `http://localhost:5000` by default
   - API endpoints will be available under `http://localhost:5000/api/`

2. **Start the frontend app (in a new terminal):**
   ```sh
   # From project root
   npm install
   npm start
   ```
   - The React development server will start on `http://localhost:3000`
   - The page will automatically reload when you make changes

3. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The frontend will automatically connect to the backend API at `http://localhost:5000`

## Usage
- Register a new account or log in with existing credentials.
- Edit your profile details and upload a profile image.
- All changes are saved in MongoDB Atlas and images are stored in Cloudinary.


