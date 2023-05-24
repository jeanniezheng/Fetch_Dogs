import { React } from 'react';

const BackButton = ({ handleClick }) => {
    return (
        <button className='back-button' onClick={handleClick}>
            Previous</button>
    )
}

export default BackButton;