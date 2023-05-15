import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import './App.css';

const App = () => {
  const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';
  const DOGS_PER_PAGE = 20;

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = async (name, email) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { name, email },
        { withCredentials: true }
      );

      setUser({ name, email });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };


  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h1 className="greeting">Welcome, {user.name}!</h1>
        </>
      )}
    </div>
  );
};

export default App;

