# Profile Dashboard Frontend

A modern React profile dashboard application with Tailwind CSS styling, authentication, profile management, and PDF generation capabilities.

## 🚀 Features

- **User Authentication**: Login and registration with JWT tokens
- **Profile Management**: Complete user profile with image upload
- **Image Upload**: Cloudinary integration for profile pictures
- **PDF Generation**: Generate and download profile PDFs
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading indicators throughout the app

## 🛠️ Tech Stack

- **React 19.1.0** - Frontend framework
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Axios 1.11.0** - HTTP client for API requests
- **Lucide React 0.525.0** - Beautiful icons
- **Inter Font** - Modern typography via Google Fonts

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.js              # Login form component
│   │   └── Register.js           # Registration form component
│   ├── layout/
│   │   ├── DashboardLayout.js    # Main dashboard layout wrapper
│   │   └── Navbar.js             # Navigation bar with user menu
│   ├── ErrorBoundary.js          # Error boundary for app crashes
│   ├── ProfileEditForm.js        # Modal form for editing profile
│   └── ProfileImageUpload.js     # Image upload with drag & drop
├── context/
│   └── AuthContext.js            # Authentication state management
├── hooks/
│   └── useProfile.js             # Custom hook for profile operations
├── pages/
│   ├── AuthPage.js               # Authentication page wrapper
│   └── ProfileDashboard.js       # Main profile dashboard
├── services/
│   ├── api.js                    # Axios instance configuration
│   ├── authService.js            # Authentication API calls
│   ├── cloudinaryService.js     # Image upload service
│   └── profileService.js        # Profile-related API calls
├── App.js                        # Main app component
├── index.js                      # React app entry point
└── index.css                     # Global styles with Tailwind
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running (see backend documentation)

### Installation


1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables in `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   REACT_APP_APP_NAME=Profile Dashboard
   REACT_APP_VERSION=1.0.0
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API base URL | Yes | `http://localhost:5000/api` |
| `REACT_APP_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `REACT_APP_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes | - |
| `REACT_APP_APP_NAME` | Application name | No | Profile Dashboard |
| `REACT_APP_VERSION` | Application version | No | 1.0.0 |

### Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name from the dashboard
3. Create an upload preset:
   - Go to Settings → Upload
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Configure folder as per uour choice
   - Save the preset name

## 📱 Key Components

### Authentication Flow
- **AuthPage**: Handles login/register toggle
- **Login**: User login with email/password
- **Register**: User registration with validation
- **AuthContext**: Global authentication state management

### Profile Management
- **ProfileDashboard**: Main profile view with edit capabilities
- **ProfileEditForm**: Modal form for updating profile details
- **ProfileImageUpload**: Drag-and-drop image upload with preview

### Layout & Navigation
- **DashboardLayout**: Main app layout wrapper
- **Navbar**: Top navigation with user dropdown menu
- **ErrorBoundary**: Catches and displays JavaScript errors

## 🎨 Styling

The application uses Tailwind CSS with a custom configuration:

### Color Palette
- **Primary**: Blue color scheme (`primary-50` to `primary-900`)
- **Custom Components**: Pre-defined button and input styles
- **Responsive**: Mobile-first responsive design

### Custom CSS Classes
```css
.btn-primary          # Primary button styling
.btn-secondary        # Secondary button styling
.input-field          # Form input styling
.card                 # Card container styling
.profile-image        # Profile image styling
```

## 🔌 API Integration

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/verify` - Token verification

### Profile Endpoints
- `PUT /users/profile/:id` - Update profile
- `GET /pdf/user/:id` - Get user PDFs
- `POST /pdf/generate-pdf` - Generate profile PDF
- `GET /pdf/download/:filename` - Download PDF

### Error Handling
- Global error interceptors
- User-friendly error messages
- Automatic token cleanup on 401 errors

## 🏗️ Build & Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Serve Production Build
```bash
npm run serve
```

### Build Optimization
- Automatic code splitting
- CSS purging in production
- Asset optimization
- Service worker ready

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |
| `npm run serve` | Serve production build locally |

## 🔍 Features Deep Dive

### Profile Image Upload
- Drag and drop functionality
- File type validation (JPEG, PNG, GIF, WebP)
- Size validation (max 5MB)
- Cloudinary integration
- Instant preview updates

### PDF Generation
- Server-side PDF generation
- Download management
- PDF history tracking
- Error handling and user feedback

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Accessible components

## 🚨 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if backend server is running on port 5000
   - Verify `REACT_APP_API_URL` in environment variables
   - Check browser console for CORS errors

2. **Image Upload Not Working**
   - Verify Cloudinary credentials in `.env`
   - Check upload preset is set to "Unsigned"
   - Ensure file size is under 5MB

3. **PDF Download Issues**
   - Check backend PDF service is running
   - Verify API endpoints are accessible
   - Check browser popup blockers

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `rm -rf build`
   - Check for missing environment variables

## 🤝 Contributing

1. Follow the existing code structure
2. Use functional components with hooks
3. Follow Tailwind CSS utility-first approach
4. Add proper error handling
5. Include loading states for async operations
6. Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License.