import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

const CreateAccount = ({ cookies }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (cookies.get('userID')) {
            setRedirect(true);
        }
    }, [cookies]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await api.post('/user/create', { email, password, name });

        cookies.set('userId', data._id);
        setRedirect(true);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <>
            {redirect && <Redirect to='/' />}
            <div className="createaccount">
                <h1 className="createaccount__title">Sign In</h1>
                <form onSubmit={handleSubmit} className="createaccount__form">
                    <input onChange={handleNameChange} type="text" placeholder="Name" />
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Password' />
                    <Link className='createaccount__form__link' to='/login'>Already have an account? Login</Link>
                    <button type="submit">Sign In</button>
                </form>
            </div>

        </>
    )
};

export default CreateAccount;
