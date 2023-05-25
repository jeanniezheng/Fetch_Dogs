import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ZipcodeFilter = ({ handleZipCodeChange, handleFilterChange }) => {
    const [zipCode, setZipCode] = useState('');
    let debounceTimer = null;

    const handleChange = (event) => {
        const zipCodeValue = event.target.value;
        setZipCode(zipCodeValue);
    };

    useEffect(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleFilterChange("zipCodeFilter", zipCode);
        }, 800);
        return () => clearTimeout(debounceTimer);
    }, [zipCode, handleFilterChange]);

    return (
        <div className="zipcode-filter">
            <label htmlFor="zipcode">Zipcode</label>
            <input id="zipcode" name="zipcode" value={zipCode} onChange={handleChange} />
        </div>
    );
};

export default ZipcodeFilter;
