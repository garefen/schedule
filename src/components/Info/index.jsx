import React from 'react';

import './style.css';

const Info = () =>{
    return (
        <div className="info">
            <h1 className="info__title">Rotina Escolar</h1>
            <div className="info__inner">
                <p className="info__inner__description">O aplicativo para <br/>gerenciar suas tarefas</p>
                <div className="info__inner__square square square-white"></div>
            </div>
            <img className='info__img' draggable='false' src={require('../../assets/agenda.svg')} alt=""/>
        </div>
    );
};

export default Info;
