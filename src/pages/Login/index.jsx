import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import { showLoader, hideLoader } from '../../services/loader.js';

import './style.css';
import { useAuth } from '../../context/auth';

import Info from '../../components/Info'; 

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
        <div className="login">
            <Info />
            <div className="login__sign">
                <div className="login__sign__square square square-blue"></div>
                <h1 className="login__sign__title">Login</h1>
                <div className="login__sign__message">Se sua conta foi criada antes de 06 de Março, por favor crie outra conta com o mesmo email cadastrado.</div>
                <form onSubmit={handleSubmit} className="login__sign__form">
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Senha' />
                    <button type="submit">Entrar</button>
                    <Link className='login__sign__form__link' to='/createaccount'>Criar uma conta</Link>
                </form>
            </div>
        </div>
    )
};

export default Login;
