import React, { useState } from 'react';

import { 
    Link,
    Redirect 
} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 

import api from '../../services/api';

import './style.css';

const Add = ({cookies}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const [redirect, setRedirect] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { data } = api.post('appointment/create', {
            userId: cookies.get('userId'),
            name: title,
            date
        })

        setRedirect(true);
    }
    
    return (
        <>
            {redirect && <Redirect to='/' />}
            <div className='add'>
                <span className="add__title">Adicionar Compromisso</span>
                <Link to='/' className="add__returnBtn"> Voltar </Link>
                <form onSubmit={handleFormSubmit} className="add__form">
                    <input type="text" placeholder='Nome' value={title} onChange={handleTitleChange} />
                    <DatePicker
                        onChange={handleDateChange}
                        selected={date}
                        showTimeSelect
                        dateFormat="Pp"
                    />

                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </>
    );
};

export default Add;
