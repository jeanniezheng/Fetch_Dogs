import React, { useState } from 'react';

const FavoriteDogs = ({ handleFavoriteDogsClick }) => {


    return (
        <button onClick={handleFavoriteDogsClick}>Favorite Dogs</button>
    );
};

export default FavoriteDogs;
