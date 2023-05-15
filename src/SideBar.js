import React, { useEffect, useState } from 'react';
import BreedFiltering from './BreedFiltering';


const SideBar = ({ dogs, handleBreedChange }) => {

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
            </div>
            <div className="sidebar-item">
                <h3>Enter Age</h3>
            </div>
        </>
    );
};

export default SideBar;
