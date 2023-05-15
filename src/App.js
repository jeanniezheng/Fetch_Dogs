import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import DogDisplay from './DogDisplay';
import './App.css';

const App = () => {
  const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';
  const DOGS_PER_PAGE = 20;

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDogs();
    }
  }, [isAuthenticated]);

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

  const fetchDogs = async () => {
    try {
      const url = buildFetchDogsURL();

      const idResponse = await axios.get(url, { withCredentials: true });
      const { resultIds, total } = idResponse.data;

      const response = await axios.post(`${API_BASE_URL}/dogs`, resultIds, {
        withCredentials: true,
      });

      const fetchedDogs = response.data;

      setDogs(fetchedDogs);
      console.log('URL:', url);
    } catch (error) {
      console.error('Failed to fetch dogs:', error);
    }
  };

  const buildFetchDogsURL = () => {
    let url = `${API_BASE_URL}/dogs/search?size=${DOGS_PER_PAGE}&from=${currentPage}`;

    return url;
  };


  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="content">
          <DogDisplay dogs={dogs} />
        </div>
      )}
    </div>
  );
};

export default App;

