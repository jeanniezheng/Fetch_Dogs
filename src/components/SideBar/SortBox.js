import React from 'react';

const SortBox = ({ handleSort }) => {

    return (
        <>
            <select name="sort" onChange={handleSort}>
                <option value="breed-asc">Breed: A-Z</option>
                <option value="breed-desc">Breed: Z-A</option>
                <option value="age-asc">Age: Low-High</option>
                <option value="age-desc">Age: High-Low</option>
            </select>
        </>
    );
};

export default SortBox;
