import { React } from 'react';

const NextButton = ({ handleClick }) => {
    return (
        <button className='next-button' onClick={handleClick}>Next</button>
    )
}

export default NextButton;