export const handleNextClick = (setCurrentPage, DOGS_PER_PAGE) => {
    setCurrentPage((prevPage) => prevPage + DOGS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const handleBackClick = (setCurrentPage, DOGS_PER_PAGE) => {
    setCurrentPage((prevPage) => Math.max(prevPage - DOGS_PER_PAGE, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const handlePaginationBarClick = (
    setCurrentPage,
    DOGS_PER_PAGE,
    index
) => {
    console.log('INDEX' + 15);
    setCurrentPage(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
