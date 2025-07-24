# Profile Dashboard React

A modern, responsive profile dashboard built with React, Tailwind CSS, and MongoDB Atlas integration. This application allows users to manage their profile information, upload profile images, and view account details in a beautiful, intuitive interface.

## Features

- 🎨 **Modern UI Design** - Clean, responsive interface with Tailwind CSS
- 📸 **Profile Image Upload** - Drag & drop or click to upload profile pictures
- ✏️ **Profile Editing** - Easy-to-use modal form for updating profile information
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔄 **Real-time Updates** - Instant UI updates when profile changes are made
- 🎭 **Loading States** - Smooth loading animations and error handling
- ✅ **Form Validation** - Client-side validation for all input fields
- 🎯 **TypeScript Ready** - Easy to convert to TypeScript if needed

## Technology Stack

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Database**: MongoDB Atlas (backend integration ready)
- **Build Tool**: React Scripts

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProfileImageUpload.js
│   └── ProfileEditForm.js
├── hooks/               # Custom React hooks
│   └── useProfile.js
├── pages/               # Main page components
│   └── ProfileDashboard.js
├── services/            # API service functions
│   └── profileService.js
└── utils/               # Utility functions (for future use)
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

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
