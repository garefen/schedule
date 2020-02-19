import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

const Login = ({ cookies }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (cookies.get('userId')) {
            history.push('/');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await api.post('/login', { email, password });

        if (data.error) {
            alert("Email e senha incorretos");
        } else {
            cookies.set('userId', data._id);
            console.log('cookie setted')
            console.log(cookies)
            document.getElementById('loader-wrapper').classList.add('active');
            setTimeout(() => {
                setRedirect(true)
                console.log('redirect, true')
            }, 2000)
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
                    <input onChange={handleEmailChange} type="text" placeholder="Email" />
                    <input onChange={handlePasswordChange} type="password" placeholder='Senha' />
                    <Link className='login__form__link' to='/createaccount'>Criar uma conta</Link>
                    <button type="submit">Login</button>
                </form>
                <img draggable='false' src={require('../../assets/agenda.svg')} alt=""/>
            </div>
            <div id="loader-wrapper">
                <div className="loader"></div>
            </div>
        </>
    )
};

export default Login;
