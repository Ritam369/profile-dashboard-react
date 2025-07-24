import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <Login onToggleAuth={toggleAuth} />
        ) : (
          <Register onToggleAuth={toggleAuth} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
