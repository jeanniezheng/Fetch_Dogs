import { React } from 'react';

const NextButton = ({ handleNextClick }) => {
    return (
        <button className='next-button' onClick={handleNextClick}>Next</button>
    )
}

export default NextButton;