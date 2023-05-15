import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DogDisplay = ({ dogs }) => {

    return (
        <div>
            <div className="dog-card-container">
                {dogs.map((dog) => (
                    <div className="dog-card" key={dog.id}>
                        <div className='img-wrapper'>
                            <img src={`${dog.img}`} alt={dog.name} />
                        </div>
                        <div className='dog-card-info'>
                            <div className="dog-card-title">
                                <h2 className="dog-card-name">{dog.name}</h2>
                                <h2 className="dog-card-age">{dog.age}</h2>
                            </div>
                            <div className='dog-card-details'>
                                <h5>{dog.breed}</h5>
                                {/* <img src='./download.png' /> */}
                                <h5>⟟ {dog.zip_code}</h5>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DogDisplay;
