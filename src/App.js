
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader } from 'lucide-react';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthPage from './pages/AuthPage';

// Main application content
function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-primary-600">
          <Loader className="w-8 h-8 animate-spin" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  // Show dashboard if authenticated, otherwise show auth page
  return isAuthenticated ? <DashboardLayout /> : <AuthPage />;
}

// App root with providers and error boundary
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
