import { React } from 'react';

const BackButton = ({ handleClick }) => {
    return (
        <div>
            <button onClick={handleClick}>
                Previous</button>
        </div>
    )
}

export default BackButton;