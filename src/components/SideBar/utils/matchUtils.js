import axios from 'axios';
import { API_BASE_URL } from '../../../config';

export const handleGenerateMatchClick = async (
    setTotalPages,
    DOGS_PER_PAGE,
    setDogs,
    setOnMatchedSection,
    heartedDogs
) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/dogs/match`, heartedDogs, {
            withCredentials: true,
        });
        const fetchedDogs = response.data.match;
        console.log('MATCH HEARTED ' + heartedDogs)
        console.log('RESPONSE.DATA ' + JSON.stringify(response))
        console.log('MATCHED ID ' + fetchedDogs)


        const matchedDog = await axios.post(`${API_BASE_URL}/dogs`, [fetchedDogs], {
            withCredentials: true,
        });

        let results = matchedDog.data
        console.log('RESULTS ' + JSON.stringify(results))

        let total = fetchedDogs.length;
        setTotalPages(Math.ceil(total / DOGS_PER_PAGE));

        setDogs(results)
        setOnMatchedSection(true)
        console.log('Doggy' + JSON.stringify(matchedDog.data))
    } catch (error) {
        console.log('unable to fetch dogs ' + error);
    }
};
