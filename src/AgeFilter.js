import React, { useState } from 'react';

const AgeFilter = ({ handleMaxAgeChange, handleMinAgeChange }) => {
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(10);

    const MinAgeChange = (event) => {
        const value = parseFloat(event.target.value);
        setMinAge(value);
        handleMinAgeChange(value);
    };

    const MaxAgeChange = (event) => {
        const value = parseFloat(event.target.value);
        setMaxAge(value);
        handleMaxAgeChange(value);
    };

    return (
        <div className="age-filter">
            <label htmlFor="minAge">Min Age:</label>
            <input
                type="number"
                id="minAge"
                name="minAge"
                min="0"
                max={maxAge}
                step="1"
                value={minAge}
                onChange={MinAgeChange}
            />

            <label htmlFor="maxAge">Max Age:</label>
            <input
                type="number"
                id="maxAge"
                name="maxAge"
                min={minAge}
                max="10"
                step="1"
                value={maxAge}
                onChange={MaxAgeChange}
            />
        </div>
    );
};

export default AgeFilter;
