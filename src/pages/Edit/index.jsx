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
    const [bullets, setBullets] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const getAppointment = async () => {
            const { data } = await api.post('/appointment/getone', { id });

            setTitle(data.name);
            setBullets(data.bullets);
            setDate(new Date(data.date));
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

        let bul = [...document.getElementsByClassName('edit__form__bullet')];
        let arr = [];
        bul.map((item) => {
            arr.push((item.value));
        })

        await api.post('appointment/edit', {
            id,
            name: title,
            date,
            bullets: arr
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
                    {bullets.map((value) => {
                        return <input type="text" defaultValue={value} className='edit__form__bullet' />
                    })}
                    <button type='submit'>Enviar</button>
                    <img src={require('../../assets/editpage.svg')} alt=""/>
                </form>
            </div>
        </>
    );
};

export default Edit;
