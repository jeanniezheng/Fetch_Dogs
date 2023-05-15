import React from 'react';

const GenerateMatch = ({ handleGenerateMatchClick }) => {

    // let text = onFavoriteDogsSection ? "Show All Dogs" : "Favorite Dogs"
    return (
        <button onClick={handleGenerateMatchClick}>Generate Match!</button>
    );
};

export default GenerateMatch;
