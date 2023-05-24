import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BreedFiltering = ({ dogs, handleBreedChange }) => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [dogsAvailable, setDogsAvailable] = useState({});
    const [selectedBreeds, setSelectedBreeds] = useState([]);

    const handleChange = (event) => {
        const breed = event.target.value;
        if (event.target.checked) {
            setSelectedBreeds((prevSelectedBreeds) => [...prevSelectedBreeds, breed]);
        } else {
            setSelectedBreeds((prevSelectedBreeds) =>
                prevSelectedBreeds.filter((selectedBreed) => selectedBreed !== breed)
            );
        }
    };

    useEffect(() => {
        fetchDogBreeds();
    }, []);

    useEffect(() => {
        console.log('SELECTED ' + selectedBreeds)
        handleBreedChange(selectedBreeds);
    }, [selectedBreeds]);

    const fetchDogBreeds = async () => {
        try {
            const response = await axios.get(
                'https://frontend-take-home-service.fetch.com/dogs/breeds',
                { withCredentials: true }
            );
            const results = response.data;
            setDogBreeds(results);

            if (results.length > 0) {
                fetchDogsAvailable(results);
            }
        } catch (error) {
            console.error('Failed to fetch breeds', error);
        }
    };

    const fetchDogsAvailable = async (breeds) => {
        try {
            const fetchPromises = breeds.map(async (breed) => {
                const response = await axios.get(
                    `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}`,
                    { withCredentials: true }
                );
                const totalDogsAvailable = response.data.total;
                return { breed, totalDogsAvailable };
            });

            const results = await Promise.all(fetchPromises);
            const dogsAvailableMap = results.reduce((acc, { breed, totalDogsAvailable }) => {
                acc[breed] = totalDogsAvailable;
                return acc;
            }, {});

            setDogsAvailable(dogsAvailableMap);
        } catch (error) {
            console.error('Failed to fetch available dogs:', error);
        }
    };

    return (
        <div className="breed-filter">
            {dogBreeds.map((breed) => (
                <div className="dogs" key={breed}>
                    <input
                        id={breed}
                        type="checkbox"
                        value={breed}
                        checked={selectedBreeds.includes(breed)}
                        onChange={handleChange}
                    />
                    <label htmlFor={breed}>
                        {breed} ({dogsAvailable[breed] || 0})
                    </label>
                </div>
            ))}
        </div>
    );
};

export default BreedFiltering;