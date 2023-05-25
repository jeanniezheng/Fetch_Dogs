// export const handleBreedChange = (setBreedFilter) => (value) => {
//     setBreedFilter(value);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// };

export const handleZipCodeChange = (
    setZipCodeFilter,
    zipCodeFilter,
    setCurrentPage
) => (value) => {
    if (value !== zipCodeFilter) {
        setZipCodeFilter(value);
        setCurrentPage(0);
    }
};

export const handleMinAgeChange = (
    setMinAgeFilter,
    minAgeFilter,
    setCurrentPage
) => (value) => {
    if (value !== minAgeFilter) {
        setMinAgeFilter(value);
        setCurrentPage(0);
    }
};

export const handleMaxAgeChange = (
    setMaxAgeFilter,
    maxAgeFilter,
    setCurrentPage
) => (value) => {
    if (value !== maxAgeFilter) {
        setMaxAgeFilter(value);
        setCurrentPage(0);
    }
};
