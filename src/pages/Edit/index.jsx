import React, { useEffect, useState } from 'react';

import InputMask from 'react-input-mask';

import { 
    Link,
    useParams, 
    Redirect
} from 'react-router-dom';

import { useAlert } from 'react-alert';

import api from '../../services/api';

import { showLoader, hideLoader } from '../../services/loader'

import './style.css';

const Edit = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState("");    
    const [bullets, setBullets] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    const alert = useAlert();

    useEffect(() => {
        const getAppointment = async () => {
            showLoader();
            const { data } = await api.post('/appointment/getone', { id });

            setTitle(data.name);
            setBullets(data.bullets);
            const exmDate = new Date(data.date);
            setDate(exmDate);
            setShowDate(`${
                (exmDate.getDate()).toString().padStart(2, '0')}/${
                (exmDate.getMonth()+1).toString().padStart(2, '0')}/${
                exmDate.getFullYear().toString().padStart(4, '0')} ${
                exmDate.getHours().toString().padStart(2, '0')}:${
                exmDate.getMinutes().toString().padStart(2, '0')}`);
            hideLoader();
        }

        getAppointment();

    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDateChange = (e) => {
        let valor = e.target.value.split('/');
        valor = [valor[1], valor[0], valor[2]].join("/");
        setShowDate(e.target.value);
        setDate(new Date(valor));
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
        
        alert.show("Editado");

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
                    <InputMask 
                        type="text"
                        onChange={handleDateChange}
                        value={showDate}
                        placeholder="Data e hora"
                        mask="99/99/9999 99:99"
                        maskChar=" "
                    />
                    {bullets.map((value) => {
                        return <input type="text" defaultValue={value} className='edit__form__bullet' />
                    })}
                    <button type='submit'>
                        <span>Enviar</span>
                        <div className="clip">Enviar</div>
                    </button>
                    <img src={require('../../assets/editpage.svg')} alt=""/>
                </form>
            </div>
        </>
    );
};

export default Edit;
