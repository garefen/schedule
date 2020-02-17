import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

const Login = ({ cookies }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (cookies.get('userID')) {
            setRedirect(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await api.post('/login', { email, password });

        console.log(data);
        if (data.error) {
            alert("Email or password incorrect");
        } else {
            cookies.set('userId', data._id);
            setRedirect(true);
        }
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
            <div className="login">
                <h1 className="login__title">Login</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <input onChange={handleEmailChange} type="text" placeholder="email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='password' />
                    <button type="submit">Entrar</button>
                </form>
            </div>

        </>
    )
};

export default Login;
