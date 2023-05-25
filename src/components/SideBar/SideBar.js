import React, { useEffect, useState } from 'react';
import BreedFiltering from './BreedFiltering';
import ZipcodeFilter from './ZipcodeFilter';
import AgeFilter from './AgeFilter';
import FavoriteDogs from './FavoriteDogs';
import SortBox from './SortBox';
import GenerateMatchButton from './GenerateMatchButton';


const SideBar = ({ dogs, handleZipCodeChange, handleMaxAgeChange, handleMinAgeChange, handleFavoriteDogsClick, onFavoriteDogsSection, handleGenerateMatchClick, handleSort, filters, handleFilterChange }) => {

    return (
        <>
            <div className="sidebar-item">
                <h3>Sort</h3>
                <SortBox handleSort={handleSort} />
            </div>

            <div className="sidebar-item">
                <h3>Select Breed</h3>
                <BreedFiltering dogs={dogs} filters={filters} handleFilterChange={handleFilterChange} />
            </div>

            <div className="sidebar-item">
                <h3>Enter Location</h3>
                <ZipcodeFilter dogs={dogs} handleZipCodeChange={handleZipCodeChange} />
            </div>
            <div className="sidebar-item">
                <h3>Enter Age</h3>
                <AgeFilter dogs={dogs} handleMaxAgeChange={handleMaxAgeChange} handleMinAgeChange={handleMinAgeChange} />
            </div>

            <div className='sidebar-buttons'>
                <FavoriteDogs handleFavoriteDogsClick={handleFavoriteDogsClick} onFavoriteDogsSection={onFavoriteDogsSection} />
                <GenerateMatchButton handleGenerateMatchClick={handleGenerateMatchClick} />
            </div>
        </>
    );
};

export default SideBar;
