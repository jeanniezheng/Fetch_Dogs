import { React } from 'react';

const NextButton = ({ handleClick }) => {
    return (
        <div>
            <button onClick={handleClick}>Next</button>
        </div>
    )
}

export default NextButton;