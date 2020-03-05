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
        <div className="login">
            <div className="login__info">
                <span className="login__info__absolute rotina mobile-hide">
                    Rotina
                </span>
                <span className="login__info__absolute escolar mobile-hide">
                    Escolar
                </span>
                <h1 className="login__info__title">Rotina Escolar</h1>
                <div className="login__info__inner">
                    <p className="login__info__inner__description">O aplicativo para <br/>gerenciar suas tarefas</p>
                    <div className="login__info__inner__square square square-white"></div>
                </div>
                <img className='login__info__img' draggable='false' src={require('../../assets/agenda.svg')} alt=""/>
            </div>
            <div className="login__sign">
                <div className="login__sign__square square square-blue"></div>
                <h1 className="login__sign__title">Login</h1>
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
