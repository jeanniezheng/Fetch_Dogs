import React from 'react';

const GenerateMatchButton = ({ handleGenerateMatchClick }) => {

    // let text = onFavoriteDogsSection ? "Show All Dogs" : "Favorite Dogs"
    return (
        <button className='generate-dogs-button' onClick={handleGenerateMatchClick}>Generate Match!</button>
    );
};

export default GenerateMatchButton;
