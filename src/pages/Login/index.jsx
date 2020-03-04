import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import { showLoader, hideLoader } from '../../services/loader.js';

import './style.css';
import { useAuth } from '../../context/auth';

const Login = (props) => {
    let referer = '/';
    if (props.location.state) {
        referer = props.location.state.referer || '/';
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const { setAuthTokens } = useAuth();

    useEffect(() => {
        hideLoader();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoader();
        const { data } = await api.post('/login', { email, password });
        
        if (data.error) {
            hideLoader();
            alert("Email e senha incorretos");
        } else {
            showLoader();
            setAuthTokens(data);
            setLoggedIn(true);
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />
    }

    return (
        <>
            <div className="login">
                <h1 className="login__title">Login</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Senha' />
                    <Link className='login__form__link' to='/createaccount'>Criar uma conta</Link>
                    <button type="submit">Login</button>
                </form>
                <img draggable='false' src={require('../../assets/agenda.svg')} alt=""/>
            </div>
            
        </>
    )
};

export default Login;
