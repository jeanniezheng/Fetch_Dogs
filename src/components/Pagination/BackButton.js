import { React } from 'react';

const BackButton = ({ handleBackClick }) => {
    return (
        <button className='back-button' onClick={handleBackClick}>
            Previous</button>
    )
}

export default BackButton;