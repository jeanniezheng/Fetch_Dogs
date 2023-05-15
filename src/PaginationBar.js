import React from 'react';

const PaginationBar = ({ totalPages, currentPage, handleClick }) => {
    const visiblePages = 5; // Number of visible page numbers
    const currentPageIndex = Math.floor(currentPage / visiblePages);

    let startPageIndex = currentPageIndex - Math.floor(visiblePages / 2);
    let endPageIndex = currentPageIndex + Math.floor(visiblePages / 2);

    if (startPageIndex < 0) {
        startPageIndex = 0;
        endPageIndex = Math.min(visiblePages - 1, totalPages - 1);
    }

    if (endPageIndex >= totalPages) {
        endPageIndex = totalPages - 1;
        startPageIndex = Math.max(totalPages - visiblePages, 0);
    }

    const pageNumbers = [];

    if (startPageIndex > 0) {
        pageNumbers.push(
            <button
                key="first"
                className="pagination-button"
                onClick={() => handleClick(0)}
            >
                1
            </button>
        );

        if (startPageIndex > 1) {
            pageNumbers.push(<span className='ellipsis' key="ellipsis">...</span>);
        }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
        const pageIndex = i * visiblePages;
        const pageNumber = i + 1;

        pageNumbers.push(
            <button
                key={pageIndex}
                className={`pagination-button ${currentPage === pageIndex ? 'active' : ''}`}
                onClick={() => handleClick(pageIndex)}
            >
                {pageNumber}
            </button>
        );
    }

    if (endPageIndex < totalPages - 1) {
        if (endPageIndex < totalPages - 2) {
            pageNumbers.push(<span className='ellipsis' key="ellipsis">...</span>);
        }

        pageNumbers.push(
            <button
                key="last"
                className="pagination-button"
                onClick={() => handleClick((totalPages - 1) * visiblePages)}
            >
                {totalPages}
            </button>
        );
    }

    return <div className="pagination-bar">{pageNumbers}</div>;
};

export default PaginationBar;
