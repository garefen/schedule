import React, { useEffect, useState } from 'react';

import { 
    Link,
    useParams, 
    Redirect
} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from '../../services/api';

import './style.css';

const Edit = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const getAppointment = async () => {
            const { data } = await api.post('/appointment/getone', { id });

            setTitle(data.name);
        }

        getAppointment();

    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event);
    }    

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { data } = await api.post('appointment/edit', {
            id,
            name: title,
            date
        });       
        
        setRedirect(true);

    }

    return (
        <>
            {redirect && <Redirect to='/' />}
            <div className='edit'>
                <span className="edit__title">Editar Compromisso</span>
                <Link to='/' className="edit__returnBtn"> Voltar </Link>
                <form onSubmit={handleFormSubmit} className="edit__form">
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

export default Edit;
