import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import LoginForm from './components/Login/LoginForm';
import Greetings from './components/DogDisplay/Greetings';
import DogDisplay from './components/DogDisplay/DogDisplay';
import NextButton from './components/Pagination/NextButton';
import BackButton from './components/Pagination/BackButton';
import PaginationBar from './components/Pagination/PaginationBar';
import Pagination from './components/Pagination/Pagination';
import SideBar from './components/SideBar/SideBar';
import GenerateMatchButton from './components/SideBar/GenerateMatchButton';

import './styles/App.css';

import { handleLogin } from './components/Login/utils/loginUtils';
import { fetchDogs, buildFetchDogsURL } from './components/DogDisplay/utils/fetchUtils';
import { handleSort } from './components/SideBar/utils/sortUtils';
import {
  handleBreedChange,
  handleZipCodeChange,
  handleMinAgeChange,
  handleMaxAgeChange,
} from './components/SideBar/utils/filterHandlers';
import { handleHeartClick } from './components/DogDisplay/utils/heartUtils';
import { fetchFavoriteDogs, handleFavoriteDogsClick } from './components/SideBar/utils/favoriteUtils';
import { handleGenerateMatchClick } from './components/SideBar/utils/matchUtils';
import { handleNextClick, handleBackClick, handlePaginationBarClick } from './components/Pagination/utils/paginationUtils';

const DOGS_PER_PAGE = 20;

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dogs, setDogs] = useState([]);
  // const [breedFilter, setBreedFilter] = useState('');
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
      console.log('FILTERS ' + JSON.stringify(filters))
      fetchDogs({
        setDogs,
        setTotalPages,
        DOGS_PER_PAGE,
        currentPage,
        zipCodeFilter,
        minAgeFilter,
        maxAgeFilter,
        sortField,
        sort,
        onFavoriteDogsSection,
        filters,
      });
    }
  }, [
    isAuthenticated,
    currentPage,
    zipCodeFilter,
    minAgeFilter,
    maxAgeFilter,
    heartedDogs,
    onFavoriteDogsSection,
    sort,
    filters
  ]);

  const handleLoginCallback = async (name, email) => {
    try {
      await handleLogin(name, email, setUser, setIsAuthenticated);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleFilterChangeCallback = useCallback((field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setCurrentPage(0);
  }, []);


  // const handleZipCodeChange = (
  //   setZipCodeFilter,
  //   zipCodeFilter,
  //   setCurrentPage
  // ) => (value) => {
  //   if (value !== zipCodeFilter) {
  //     setZipCodeFilter(value);
  //     setCurrentPage(0);
  //   }
  // };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLoginCallback} />
      ) : (
        <div className="content">
          <Greetings
            isAuthenticated={isAuthenticated}
            handleLoginCallback={handleLoginCallback}
            onMatchedSection={onMatchedSection}
            handleGenerateMatchClick={handleGenerateMatchClick}
            DOGS_PER_PAGE={DOGS_PER_PAGE}
            onFavoriteDogsSection={onFavoriteDogsSection}
            setTotalPages={setTotalPages}
            setDogs={setDogs}
            setOnMatchedSection={setOnMatchedSection}
            heartedDogs={heartedDogs}
            user={user}
          />

          <div className="sidebar">
            <SideBar
              dogs={dogs}
              filters={filters}
              handleFilterChange={handleFilterChangeCallback}
              // handleBreedChange={handleBreedChange(setBreedFilter)}
              handleZipCodeChange={handleZipCodeChange(
                setZipCodeFilter,
                zipCodeFilter,
                setCurrentPage
              )}
              handleMaxAgeChange={handleMaxAgeChange(setMaxAgeFilter, maxAgeFilter, setCurrentPage)}
              handleMinAgeChange={handleMinAgeChange(setMinAgeFilter, minAgeFilter, setCurrentPage)}
              handleFavoriteDogsClick={() =>
                handleFavoriteDogsClick(
                  onFavoriteDogsSection,
                  setOnFavoriteDogsSection,
                  heartedDogs,
                  setDogs,
                  setTotalPages,
                  DOGS_PER_PAGE,
                  setOnMatchedSection
                )
              }
              onFavoriteDogsSection={onFavoriteDogsSection}
              handleSort={(event) => handleSort(event, setSortField, setSort)}
              handleGenerateMatchClick={() =>
                handleGenerateMatchClick(
                  setTotalPages,
                  DOGS_PER_PAGE,
                  setDogs,
                  setOnMatchedSection,
                  heartedDogs
                )
              }
            />
          </div>

          <DogDisplay
            dogs={dogs}
            handleHeartClick={(dogId) => handleHeartClick(dogId, heartedDogs, setHeartedDogs)}
            heartedDogs={heartedDogs}
          />

          <div className="page-bar">
            <Pagination
              fetchDogs={fetchDogs}
              handleBackClick={() => handleBackClick(setCurrentPage, DOGS_PER_PAGE)}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePaginationBarClick={(page) =>
                handlePaginationBarClick(setCurrentPage, DOGS_PER_PAGE, currentPage)
              }
              handleNextClick={() => handleNextClick(setCurrentPage, DOGS_PER_PAGE)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
