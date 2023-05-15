import React, { useEffect, useState } from 'react';
import BreedFiltering from './BreedFiltering';
import ZipcodeFilter from './ZipcodeFilter';
import AgeFilter from './AgeFilter';


const SideBar = ({ dogs, handleBreedChange, handleZipCodeChange, handleMaxAgeChange, handleMinAgeChange }) => {

    return (
        <>
            <div className="sidebar-item">

                <h3>Sort</h3>
            </div>

            <div className="sidebar-item">
                <h3>Select Breed</h3>
                <BreedFiltering dogs={dogs} handleBreedChange={handleBreedChange} />
            </div>

            <div className="sidebar-item">
                <h3>Enter Location</h3>
                <ZipcodeFilter dogs={dogs} handleZipCodeChange={handleZipCodeChange} />
            </div>
            <div className="sidebar-item">
                <h3>Enter Age</h3>
                <AgeFilter dogs={dogs} handleMaxAgeChange={handleMaxAgeChange} handleMinAgeChange={handleMinAgeChange} />
            </div>
        </>
    );
};

export default SideBar;
