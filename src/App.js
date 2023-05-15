import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import DogDisplay from './DogDisplay';
import NextButton from './NextButton';
import BackButton from './BackButton';
import PaginationBar from './PaginationBar';
import SideBar from './SideBar';

import './App.css';

const App = () => {
  const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';
  const DOGS_PER_PAGE = 20;

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
  const [onFavoriteDogsSection, setOnFavoriteDogsSection] = useState(false)



  useEffect(() => {
    if (isAuthenticated) {
      fetchDogs();
    }
    console.log(onFavoriteDogsSection)
  }, [isAuthenticated, currentPage, breedFilter, zipCodeFilter, minAgeFilter, maxAgeFilter, heartedDogs, onFavoriteDogsSection, sort]);

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

  const buildFetchDogsURL = () => {
    let url = `${API_BASE_URL}/dogs/search?size=${DOGS_PER_PAGE}&from=${currentPage}`;

    if (breedFilter && breedFilter.length > 0) {
      const breedQueryString = breedFilter.map(breed => `breeds=${breed}`).join('&');
      url += `&${breedQueryString}`;
    }

    if (zipCodeFilter) {
      url += `&zipCodes=${zipCodeFilter}`;
    }

    if (minAgeFilter) {
      url += `&ageMin=${minAgeFilter}`;
    }

    if (maxAgeFilter) {
      url += `&ageMax=${maxAgeFilter}`;
    }

    url += `&sort=${sortField}:${sort}`;
    return url;
  };

  const fetchDogs = async () => {
    try {
      if (!onFavoriteDogsSection) {

        const url = buildFetchDogsURL();

        const idResponse = await axios.get(url, { withCredentials: true });
        const { resultIds, total } = idResponse.data;

        const response = await axios.post(`${API_BASE_URL}/dogs`, resultIds, {
          withCredentials: true,
        });

        const fetchedDogs = response.data;
        setDogs(fetchedDogs);
        console.log('URL:', url);
        setTotalPages(Math.ceil(total / DOGS_PER_PAGE));
      } else {
        fetchFavoriteDogs()
      }
    } catch (error) {
      console.error('Failed to fetch dogs:', error);
    }
  };

  const handleSort = (event) => {
    const selectedSortOption = event.target.value;

    const [sortField, sortDirection] = selectedSortOption.split('-');
    setSortField(sortField);
    setSort(sortDirection);
  };

  const handleBreedChange = (value) => {
    setBreedFilter(value);
    // setCurrentPage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZipCodeChange = (value) => {
    if (value !== zipCodeFilter) {
      setZipCodeFilter(value);
      setCurrentPage(0);
    }
  };

  const handleMinAgeChange = (value) => {
    if (value !== minAgeFilter) {
      setMinAgeFilter(value);
      setCurrentPage(0);
    }
  };

  const handleMaxAgeChange = (value) => {
    if (value !== maxAgeFilter) {
      setMaxAgeFilter(value);
      setCurrentPage(0);
    }
  };

  const handleHeartClick = (dogId) => {
    if (heartedDogs.includes(dogId)) {
      setHeartedDogs((prevHeartedDogs) => prevHeartedDogs.filter((id) => id !== dogId));
    } else {
      setHeartedDogs((prevHeartedDogs) => [...prevHeartedDogs, dogId]);
    }
  };

  const fetchFavoriteDogs = async () => {
    try {
      const response = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, heartedDogs, {
        withCredentials: true,
      });
      const fetchedDogs = response.data;
      setDogs(fetchedDogs);
      let total = fetchedDogs.length;
      setTotalPages(Math.ceil(total / DOGS_PER_PAGE));
    } catch (error) {
      console.log('unable to fetch dogs ' + error)
    }
  }

  const handleFavoriteDogsClick = () => {
    if (!onFavoriteDogsSection) {
      fetchFavoriteDogs()
      setOnFavoriteDogsSection(!onFavoriteDogsSection)

    } else {
      fetchDogs()
      setOnFavoriteDogsSection(!onFavoriteDogsSection)
    }
  }


  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + DOGS_PER_PAGE);
    console.log(currentPage)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - DOGS_PER_PAGE, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(currentPage)

  };
  const handlePaginationBarClick = (index) => {
    setCurrentPage(index)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="content">
          {onFavoriteDogsSection &&
            <div>
              <h1>Favorite Doggos!</h1>
            </div>
          }
          <div className="sidebar">
            <SideBar
              dogs={dogs}
              handleBreedChange={handleBreedChange}
              handleZipCodeChange={handleZipCodeChange}
              handleMaxAgeChange={handleMaxAgeChange}
              handleMinAgeChange={handleMinAgeChange}
              handleFavoriteDogsClick={handleFavoriteDogsClick}
              onFavoriteDogsSection={onFavoriteDogsSection}
              handleSort={handleSort}

            />
          </div>
          <DogDisplay dogs={dogs} handleHeartClick={handleHeartClick} heartedDogs={heartedDogs} />          <div className="page-bar">
            <BackButton fetchDogs={fetchDogs} handleClick={handleBackClick} />
            <PaginationBar
              totalPages={totalPages}
              currentPage={currentPage}
              handleClick={handlePaginationBarClick}
            />
            <NextButton fetchDogs={fetchDogs} handleClick={handleNextClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

