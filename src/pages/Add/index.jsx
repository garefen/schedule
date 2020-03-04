import React, { useState, useEffect } from 'react';

import { 
    Link,
    Redirect 
} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
import { useAlert } from 'react-alert'

import { showLoader, hideLoader } from '../../services/loader'

import api from '../../services/api';

import './style.css';

const Add = ({cookies}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const [count, setCount] = useState(1);
    const [bulletsElements, setBulletsElements] = useState([]);
    const [bullets, setBullets] = useState([""]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        createBullets();
    }, [count]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDateChange = async (event) => {
        setDate(new Date(event));
    }

    const alert = useAlert();

    const handleFormSubmit =  async (event) => {
        event.preventDefault();
        showLoader();

        let bul = [...document.getElementsByClassName('add__form__bullet')];
        let arr = [];
        bul.map((item) => {
            arr.push((item.value));
        })
        
        await api.post('appointment/create', {
            userId: JSON.parse(localStorage.getItem("tokens"))._id,
            name: title,
            date,
            bullets: arr
        })

        alert.show("Adicionado");

        setRedirect(true);
    }

    const newBullet = () => {
        setCount(count + 1);
        setBullets(...bullets, "")
    }

    const createBullets = () => {
            setBulletsElements([
                ...bulletsElements,
                <div className="add__form__bullets__item">
                    <input type="text" placeholder='Item' className='add__form__bullet'/>
                    <button type='button' className="add__form__bullets__item__add" onClick={newBullet}>+</button>
                </div>
            ])
    }

    return (
        <>
            {redirect && <Redirect to={{ pathname: '/', state: {added: true} }}/>}
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
                    <div className="add__form__bullets">
                        {bulletsElements}
                    </div>

                    <button type='submit'>
                        <span>Enviar</span>
                        <div className="clip">Enviar</div>
                    </button>
                </form>
                <img src={require('../../assets/add.svg')} alt=""/>
            </div>
        </>
    );
};

export default Add;
