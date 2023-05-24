import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const fetchFavoriteDogs = async (heartedDogs, setDogs, setTotalPages, DOGS_PER_PAGE) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/dogs`, heartedDogs, {
            withCredentials: true,
        });
        const fetchedDogs = response.data;
        setDogs(fetchedDogs);
        let total = fetchedDogs.length;
        setTotalPages(Math.ceil(total / DOGS_PER_PAGE));
    } catch (error) {
        console.log('unable to fetch dogs ERRORRESPONSE' + error.response)
    }
}

export const handleFavoriteDogsClick = (onFavoriteDogsSection, setOnFavoriteDogsSection, heartedDogs, setDogs, setTotalPages, DOGS_PER_PAGE, setOnMatchedSection) => {
    setOnFavoriteDogsSection(!onFavoriteDogsSection);
    fetchFavoriteDogs(heartedDogs, setDogs, setTotalPages, DOGS_PER_PAGE)
    setOnMatchedSection(false)

};