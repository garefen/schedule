import React, { useEffect, useState } from 'react';

import { A } from 'hookrouter';

import data from '../../data.json';

import './style.css';

const Edit = ({ id }) => {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState("");

    useEffect(() => {
        const schedule = data.schedule.filter(item => {
            if (item._id == id) {
                return item
            }
        })
        let scheduleObj = schedule[0];
        setTitle(scheduleObj.title);
        setTime(scheduleObj.time);
        setDay(scheduleObj.day);
        setMonth(scheduleObj.month);
    
    }, []);

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
        <div className='edit'>
            <span className="edit__title">Editar Compromisso</span>
            <A href='/dashboard' className="edit__returnBtn"> Voltar </A>
            <form onSubmit={handleFormSubmit} className="edit__form">
                <input type="text" placeholder='Nome' value={title} onChange={handleTitleChange} />
                <input type="text" placeholder='Horário' value={time} onChange={handleTimeChange} />
                <input type="number" placeholder='Dia' value={day} onChange={handleDayChange} />
                <input type="text" placeholder='Mês' value={month} onChange={handleMonthChange} />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default Edit;
