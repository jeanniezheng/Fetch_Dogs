import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DogDisplay = ({ dogs }) => {

    return (
        <div>
            <div className="dog-card-container">
                {dogs.map((dog) => (
                    <div className="dog-card" key={dog.id}>

                        <div className='dog-card-info'>
                            <div className="dog-card-title">
                                <h2 className="dog-card-name">{dog.name}</h2>
                                <h2 className="dog-card-age">{dog.age}</h2>
                            </div>
                            <div className='dog-card-details'>
                                <h4>Breed: {dog.breed}</h4>
                                <h4>ZipCode: {dog.zip_code}</h4>
                            </div>


                        </div>

                        <img src={`${dog.img}`} alt={dog.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DogDisplay;
