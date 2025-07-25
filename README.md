
# Profile Dashboard React

A modern, production-ready profile dashboard application built with React, Tailwind CSS, and MongoDB Atlas. This project provides a complete solution for user authentication, profile management, and image uploads with Cloudinary integration.

## Description

Profile Dashboard React is designed for users who want a clean, responsive, and secure platform to manage their personal profiles. It features JWT-based authentication, real-time profile editing, and seamless image uploads. The UI is built with Tailwind CSS for a modern look and mobile responsiveness. The backend is powered by Node.js, Express, and MongoDB Atlas, ensuring robust data storage and security. Cloudinary integration allows for optimized image handling. The project is suitable for both personal and professional use cases where user profile management is required.

## Features
- **Authentication System:** Secure login and registration with JWT tokens
- **Profile Management:** Edit profile details, including name, email, phone, bio, and location
- **Image Uploads:** Upload and update profile images using Cloudinary
- **Modern UI:** Responsive design with Tailwind CSS
- **Error Handling:** Graceful error boundaries and user feedback
- **Mobile Friendly:** Works perfectly on all devices
- **Production Ready:** Optimized builds and secure backend

## Technology Stack
- **Frontend:** React 19.x, Tailwind CSS 4.x, Lucide React (icons), Axios
- **Backend:** Node.js, Express, MongoDB Atlas, JWT, Cloudinary

## Project Structure
```
profile-dashboard-react/
├── backend/                # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── ProfileEditForm.js
│   │   ├── ProfileImageUpload.js
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── index.js
│   ├── App.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account (for image uploads)

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
   - Create `.env` files in both frontend and backend folders using the provided `.env.example` templates.
   - Set your MongoDB Atlas URI, JWT secret, and Cloudinary credentials.

### Running the Project
- **Start the backend server:**
  ```sh
  cd backend
  npm run dev
  ```
- **Start the frontend app:**
  ```sh
  npm start
  ```
- The app will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API).

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

Create a `.env` file in the root directory for environment-specific configurations:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MONGODB_URI=your_mongodb_atlas_connection_string
```

### MongoDB Atlas Integration

The application is designed to work with MongoDB Atlas. To integrate with a real backend:

1. **Set up MongoDB Atlas**:
   - Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Create a database and collection for user profiles

2. **Backend API Endpoints**:
   The frontend expects these API endpoints:
   ```
   GET    /api/users/:id          # Get user profile
   PUT    /api/users/:id          # Update user profile
   POST   /api/users/:id/upload-image # Upload profile image
   DELETE /api/users/:id          # Delete user profile
   ```

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
     isVerified: Boolean
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
