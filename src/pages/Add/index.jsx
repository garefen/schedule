import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { A } from 'hookrouter';


import './style.css';

const Add = () => {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleTimeChange = (event) => {
        setTime(event.target.value)
    }

    const handleDayChange = (event) => {
        setDay(event.target.value);
    }

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        
    }
    
    return (
        <div className='add'>
            <span className="add__title">Adicionar Compromisso</span>
            {/* <Link to='/dashboard' className="add__returnBtn"> Voltar </Link> */}
            <A href='/dashboard' className="add__returnBtn"> Voltar </A>
            <form onSubmit={handleFormSubmit} className="add__form">
                <input type="text" placeholder='Nome' value={title} onChange={handleTitleChange} />
                <input type="text" placeholder='Horário' value={time} onChange={handleTimeChange} />
                <input type="number" placeholder='Dia' value={day} onChange={handleDayChange} />
                <input type="text" placeholder='Mês' value={month} onChange={handleMonthChange} />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default Add;
