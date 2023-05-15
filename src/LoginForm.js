import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(name, email);
        console.log('ON LOGIN ' + name + " " + email)

    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Please Login</h1>
            <div className='login-form-wrapper'>

                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;
