
# Profile Dashboard React

A modern, production-ready profile dashboard application built with React, Tailwind CSS, and MongoDB Atlas. This project follows the MVC (Model-View-Controller) architecture pattern and provides a complete solution for user authentication, profile management, and image uploads with Cloudinary integration.

## Project Structure

The application is structured following the MVC pattern for better separation of concerns and maintainability.

### Frontend (React)
```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components (Login, Register)
│   ├── forms/         # Form components (ProfileEditForm, ProfileImageUpload)
│   └── layout/        # Layout components (DashboardLayout, Navbar)
├── config/            # Configuration files
├── controllers/       # Business logic and API services (moved from services/)
│   ├── authService.js
│   ├── profileService.js
│   └── cloudinaryService.js
├── context/           # React context providers (AuthContext)
├── hooks/             # Custom React hooks (useProfile, useAuth)
├── models/            # Data models and TypeScript interfaces
├── utils/             # Utility functions
│   ├── api/           # API utility functions
│   └── validators/    # Form validation utilities
└── views/             # Page components (AuthPage, ProfileDashboard)
```

### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── database.js   # Database connection
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/       # Custom middleware
│   │   └── errorHandler.js
│   ├── models/           # Database models
│   ├── routes/           # Route definitions
│   │   ├── auth.js
│   │   ├── cloudinary.js
│   │   └── user.js
│   └── utils/            # Utility functions
├── .env.example          # Example environment variables
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

## License
MIT

---

For more details, see the code comments and documentation in each folder. Contributions and feedback are welcome!

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd profile-dashboard-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Configuration

### Environment Variables

1. **Frontend (root directory)**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

2. **Backend (backend directory)**
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### API Endpoints

The backend provides the following RESTful API endpoints:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify authentication token

#### Users
- `PUT /api/users/profile/:id` - Update user profile

#### Cloudinary
- `DELETE /api/cloudinary/delete` - Delete image (placeholder implementation)

> **Note:** Some endpoints mentioned in the frontend code might not be fully implemented in the backend yet. The API base URL is `/api` (not `/api/v1`).

3. **Profile Data Schema**:
   ```javascript
   {
     _id: String,
     firstName: String,
     lastName: String,
     email: String,
     phone: String,
     bio: String,
     profileImage: String,
     location: String,
     joinDate: Date,
   }
   ```

## Features Overview

### Profile Image Upload
- Drag and drop support
- File type validation (images only)
- File size limit (5MB)
- Loading states during upload
- Hover effects for better UX

### Profile Information
- Display user's full name with verification badge
- Show contact information (email, phone, location)
- Member since date
- Bio/description text
- Account statistics cards

### Profile Editing
- Modal-based editing form
- Real-time form validation
- Required field indicators
- Character count for bio field
- Save/cancel functionality

### Responsive Design
- Mobile-first approach
- Tablet and desktop layouts
- Touch-friendly interface
- Accessible design patterns

## Customization

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom primary color palette
- Extended font family (Inter)
- Custom component classes in `src/index.css`

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for custom component styles
- All components use Tailwind utility classes

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Browser Support

This project supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Dark mode support
- [ ] Multiple profile image formats
- [ ] Profile privacy settings
- [ ] Activity timeline
- [ ] Account deletion with confirmation
- [ ] Email verification flow
- [ ] Password change functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with a detailed description
3. Include steps to reproduce any bugs

---

**Happy coding!** 🚀
