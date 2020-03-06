import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';

import { showLoader, hideLoader } from '../../services/loader.js';

import './style.css';
import { useAuth } from '../../context/auth';

import { useAlert } from 'react-alert';

const CreateAccount = (props) => {

    const alerta = useAlert();

    let referer = '/';

    if (props.location.state) {
        referer = props.location.state.referer || '/';
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAuthTokens } = useAuth();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoader();
        if (name && email && password) {
            const { data } = await api.post('/user/create', { email, password, name });
            if (data.message === "redirect") {
                setAuthTokens(data);
                setIsLoggedIn(true);
                alerta.show("Usuário já existe, login realizado");
            } else if (data.message === "new user") {
                setAuthTokens(data);
                setIsLoggedIn(true);
                alerta.show("Conta cadastrada");
            } else {
                setIsCreated(true);
                alerta.show("Email já cadastrado");
            }
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
    } else if (isCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div className="createaccount">
            <div className="createaccount__info">
                <h1 className="createaccount__info__title">Rotina Escolar</h1>
                <div className="createaccount__info__inner">
                    <p className="createaccount__info__inner__description">O aplicativo para <br/>gerenciar suas tarefas</p>
                    <div className="createaccount__info__inner__square square square-white"></div>
                </div>
                <img className='createaccount__info__img' draggable='false' src={require('../../assets/agenda.svg')} alt=""/>
            </div>
            <div className="createaccount__sign">
                <div className="createaccount__sign__square square square-blue"></div>
                <h1 className="createaccount__sign__title">Criar Conta</h1>
                <form onSubmit={handleSubmit} className="createaccount__sign__form">
                    <input onChange={handleNameChange} type="text" placeholder="Nome" />
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Senha' />
                    <button type="submit">Entrar</button>
                    <Link className='createaccount__sign__form__link' to='/login'>Já tem uma conta? Clique aqui</Link>
                </form>
            </div>
        </div>
    )
};

export default CreateAccount;
