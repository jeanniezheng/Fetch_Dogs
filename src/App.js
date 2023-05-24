import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './components/Login/LoginForm';
import DogDisplay from './components/DogDisplay/DogDisplay';
import NextButton from './components/Pagination/NextButton';
import BackButton from './components/Pagination/BackButton';
import PaginationBar from './components/Pagination/PaginationBar';
import SideBar from './components/SideBar/SideBar';
import GenerateMatchButton from './components/SideBar/GenerateMatchButton';

import './styles/App.css';

import { handleLogin } from './components/Login/utils/loginUtils';
import { fetchDogs, buildFetchDogsURL } from './components/DogDisplay/utils/fetchUtils';
import { handleSort } from './components/SideBar/utils/sortUtils';
import { handleBreedChange, handleZipCodeChange, handleMinAgeChange, handleMaxAgeChange } from './components/SideBar/utils/filterHandlers';
import { handleHeartClick } from './components/DogDisplay/utils/heartUtils';
import { fetchFavoriteDogs, handleFavoriteDogsClick } from './components/SideBar/utils/favoriteUtils';
import { handleGenerateMatchClick } from './components/SideBar/utils/matchUtils';
import { handleNextClick, handleBackClick, handlePaginationBarClick } from './components/Pagination/utils/paginationUtils';

const DOGS_PER_PAGE = 20;

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [zipCodeFilter, setZipCodeFilter] = useState('');
  const [minAgeFilter, setMinAgeFilter] = useState(0);
  const [maxAgeFilter, setMaxAgeFilter] = useState(20);
  const [heartedDogs, setHeartedDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('asc');
  const [sortField, setSortField] = useState('breed');
  const [filters, setFilters] = useState({
    breedFilter: '',
    zipCodeFilter: '',
    minAgeFilter: 0,
    maxAgeFilter: 20,
  });
  const [onFavoriteDogsSection, setOnFavoriteDogsSection] = useState(false);
  const [onMatchedSection, setOnMatchedSection] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDogs({
        setDogs,
        setTotalPages,
        DOGS_PER_PAGE,
        currentPage,
        breedFilter,
        zipCodeFilter,
        minAgeFilter,
        maxAgeFilter,
        sortField,
        sort,
        onFavoriteDogsSection
      });
    }

  }, [
    isAuthenticated,
    currentPage,
    breedFilter,
    zipCodeFilter,
    minAgeFilter,
    maxAgeFilter,
    heartedDogs,
    onFavoriteDogsSection,
    sort
  ]);



  const handleLoginCallback = async (name, email) => {
    try {
      await handleLogin(name, email, setUser, setIsAuthenticated);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleFilterChangeCallback = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setCurrentPage(0);
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLoginCallback} />
      ) : (
        <div className="content">
          {onMatchedSection ? (
            <div>
              <h1 className="greetings">YOU'VE GOT A MATCH!</h1>
            </div>
          ) : onFavoriteDogsSection ? (
            <div className="greetings">
              <h1>Favorite Doggos!</h1>
              <GenerateMatchButton handleGenerateMatchClick={() => handleGenerateMatchClick(setTotalPages,
                DOGS_PER_PAGE,
                setDogs,
                setOnMatchedSection,
                heartedDogs)}
              />
            </div>
          ) : (
            <h1 className="greetings">Hi there {user.name}! Welcome to Doggy Land</h1>
          )}

          <div className="sidebar">
            <SideBar
              dogs={dogs}
              filters={filters}
              handleFilterChange={handleFilterChangeCallback}
              handleBreedChange={handleBreedChange(setBreedFilter)}
              handleZipCodeChange={handleZipCodeChange(
                setZipCodeFilter,
                zipCodeFilter,
                setCurrentPage)}
              handleMaxAgeChange={handleMaxAgeChange(setMaxAgeFilter,
                maxAgeFilter,
                setCurrentPage)}
              handleMinAgeChange={handleMinAgeChange(setMinAgeFilter,
                minAgeFilter,
                setCurrentPage)}
              handleFavoriteDogsClick={() => handleFavoriteDogsClick(onFavoriteDogsSection, setOnFavoriteDogsSection, heartedDogs, setDogs, setTotalPages, DOGS_PER_PAGE, setOnMatchedSection
              )}

              onFavoriteDogsSection={onFavoriteDogsSection}
              handleSort={(event) => handleSort(event, setSortField, setSort)}

              handleGenerateMatchClick={() => handleGenerateMatchClick(setTotalPages,
                DOGS_PER_PAGE,
                setDogs,
                setOnMatchedSection,
                heartedDogs)}
            />
          </div>

          <DogDisplay
            dogs={dogs}
            handleHeartClick={(dogId) => handleHeartClick(dogId, heartedDogs, setHeartedDogs)}
            heartedDogs={heartedDogs}
          />
          <div className="page-bar">
            <BackButton
              fetchDogs={fetchDogs}
              handleClick={() => handleBackClick(setCurrentPage, DOGS_PER_PAGE)} />

            <PaginationBar
              totalPages={totalPages}
              currentPage={currentPage}
              handleClick={(page) => handlePaginationBarClick(setCurrentPage,
                DOGS_PER_PAGE, currentPage)} />

            <NextButton
              fetchDogs={fetchDogs}
              handleClick={() => handleNextClick(setCurrentPage, DOGS_PER_PAGE)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
