import React from 'react';
import LoginForm from '../Login/LoginForm';
import GenerateMatchButton from '../SideBar/GenerateMatchButton';

const Greetings = ({ isAuthenticated, handleLoginCallback, onMatchedSection, onFavoriteDogsSection, handleGenerateMatchClick, DOGS_PER_PAGE, setTotalPages, setDogs, setOnMatchedSection, heartedDogs, user }) => {
    return (
        <>

            {onMatchedSection ? (
                <div>
                    <h1 className="greetings">YOU'VE GOT A MATCH!</h1>
                </div>
            ) : onFavoriteDogsSection ? (
                <div className="greetings">
                    <h1>Favorite Doggos!</h1>
                    <GenerateMatchButton handleGenerateMatchClick={() => handleGenerateMatchClick(setTotalPages,
                        DOGS_PER_PAGE,
                        setDogs,
                        setOnMatchedSection,
                        heartedDogs)}
                    />
                </div>
            ) : (
                <h1 className="greetings">Hi there {user.name}! Welcome to Doggy Land</h1>
            )}

        </>
    );
};

export default Greetings;
