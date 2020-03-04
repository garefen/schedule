import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';

import { showLoader, hideLoader } from '../../services/loader.js';

import './style.css';
import { useAuth } from '../../context/auth';

const CreateAccount = (props) => {
    let referer = '/';

    if (props.location.state) {
        referer = props.location.state.referer || '/';
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAuthTokens } = useAuth();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoader();
        if (name && email && password) {
            const { data } = await api.post('/user/create', { email, password, name });
            setAuthTokens(data);
            setIsLoggedIn(true);
        } else {
            alert("Preencha todos os campos");
            hideLoader();
        }

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

    if (isLoggedIn) {
        return <Redirect to={referer} />
    }

    return (
        <>
            <div className="createaccount">
                <h1 className="createaccount__title">Criar Conta</h1>
                <form onSubmit={handleSubmit} className="createaccount__form">
                    <input onChange={handleNameChange} type="text" placeholder="Nome" />
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Senha' />
                    <Link className='createaccount__form__link' to='/login'>Já tem uma conta? Clique aqui</Link>
                    <button type="submit">Criar conta</button>
                </form>
            </div>

        </>
    )
};

export default CreateAccount;
