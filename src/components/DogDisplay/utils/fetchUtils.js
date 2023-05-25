import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const buildFetchDogsURL = (breedFilter, zipCodeFilter, minAgeFilter, maxAgeFilter, sortField, sort, DOGS_PER_PAGE, currentPage, onFavoriteDogsSection, filters) => {
    let url = `${API_BASE_URL}/dogs/search?size=${DOGS_PER_PAGE}&from=${currentPage}`;

    if (filters.breedFilter && filters.breedFilter.length > 0) {
        const breedQueryString = filters.breedFilter.map(breed => `breeds=${breed}`).join('&');
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

export const fetchDogs = async ({
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
    onFavoriteDogsSection,
    filters
}) => {
    if (!onFavoriteDogsSection) {

        try {
            const url = buildFetchDogsURL(
                breedFilter,
                zipCodeFilter,
                minAgeFilter,
                maxAgeFilter,
                sortField,
                sort,
                DOGS_PER_PAGE,
                currentPage,
                onFavoriteDogsSection,
                filters
            );
            console.log('URL ' + url);
            const idResponse = await axios.get(url, { withCredentials: true });
            const { resultIds, total } = idResponse.data;
            const response = await axios.post(`${API_BASE_URL}/dogs`, resultIds, {
                withCredentials: true,
            });

            const fetchedDogs = response.data;
            setDogs(fetchedDogs);
            setTotalPages(Math.ceil(total / DOGS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    }
};
