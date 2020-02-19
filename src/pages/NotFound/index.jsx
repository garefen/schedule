import React from 'react';

import { useHistory } from 'react-router-dom';

import './style.css'



const NotFound = () => {
    const history = useHistory();

    const handleButtonPress = () => {
        history.push('/');
    }
    return(
        <div className="notfound">
            <h1>Página não encontrada</h1>
            <button onClick={handleButtonPress}>Voltar para tela inicial</button>
        </div>
    )
};

export default NotFound;
