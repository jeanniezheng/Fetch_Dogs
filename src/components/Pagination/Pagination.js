import React from 'react';
import BackButton from './BackButton';
import NextButton from './NextButton';
import PaginationBar from './PaginationBar';

const Pagination = ({ fetchDogs, handleBackClick, handleNextClick, handlePaginationBarClick, currentPage, totalPages }) => {
    return (
        <>
            <BackButton
                fetchDogs={fetchDogs}
                handleBackClick={handleBackClick} />

            <PaginationBar
                totalPages={totalPages}
                currentPage={currentPage}
                handlePaginationBarClick={handlePaginationBarClick} />

            <NextButton
                fetchDogs={fetchDogs}
                handleNextClick={handleNextClick} />
        </>
    )
};

export default Pagination;
