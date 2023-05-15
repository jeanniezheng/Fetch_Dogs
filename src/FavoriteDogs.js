import React, { useState } from 'react';

const FavoriteDogs = ({ handleFavoriteDogsClick, onFavoriteDogsSection }) => {

    let text = onFavoriteDogsSection ? "Show All Dogs" : "Favorite Dogs"
    return (
        <button onClick={handleFavoriteDogsClick}>{text}</button>
    );
};

export default FavoriteDogs;
