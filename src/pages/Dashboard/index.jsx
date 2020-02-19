import React, { useState, useEffect } from 'react';

import { showLoader, hideLoader } from '../../services/loader';

import {
    Link,
    Redirect
} from 'react-router-dom';

import './style.css';

import Schedule from '../../components/Schedule';
import ScheduleDescription from '../../components/ScheduleDescription';

import api from '../../services/api'

const Dashboard = ({ cookies }) => {
    const [schedule, setSchedule] = useState([]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getAppointments = async () => {
            const { data } = await api.post('/appointment', { userId: cookies.get('userId') });
            setSchedule(data);
            hideLoader();
        }

        getAppointments();
    }, [cookies]);

    function scrollOnClick() {
        const slider = document.querySelector('.dashboard__slider');
        if (this === schedule.length) {
            document.getElementById('cta_button__add').classList.remove('active')
        } else {
            document.getElementById('cta_button__add').classList.add('active')
        }
        slider.scrollTo({
            left: window.innerWidth * .99 * this,
            behavior: 'smooth'
        });
        const items = document.getElementsByClassName('dashboard__controls__item');
        for (let item of items) {
            item.classList.remove('active');
        }
        document.getElementById(`item_${this}`).classList.add('active');
    }

    const logout = () => {
        cookies.remove('userId');
        setRedirect(true);
    }

    return (
        <div className="dashboard">
            {redirect && <Redirect to='/login'/>}
            <div className="dashboard__add">
                <Link to='/add' id="cta_button__add" className="dashboard__add__button active">+</Link>
            </div>
            <div className="dashboard__logout">
                <button onClick={logout}>Sair</button>
            </div>
            <div className="dashboard__slider">
                {schedule.map((item, key) => {
                    return (
                        <div key={key} className="dashboard__slider__item">
                            <Schedule item={item} />
                            <ScheduleDescription weekDay={item.weekday} day={item.day} month={item.month}/>
                        </div>
                    )
                })}
                <div id="1" className="dashboard__slider__item">
                    <div className="dashboard__slider__item__lastSlide">
                        <span className="dashboard__slider__item__lastSlide__title">
                            Adicione um compromisso
                        </span>
                        <img draggable='false' className='dashboard__slider__item__lastSlide__image' src={require('../../assets/idle.svg')} alt=""/>
                    </div>
                    <div className="dashboard__slider__item__lastSlide__cta">
                        <Link to='/add' className="dashboard__slider__item__lastSlide__cta__button">+</Link>
                   </div>
                </div>
            </div>
            <div className="dashboard__controls">
                {schedule.map((item, key) => {
                    if (key === 0) {
                        return (
                            <span id={`item_${key}`} key={key} onClick={scrollOnClick.bind(key)} className="dashboard__controls__item active"></span>
                        )
                    }
                    return (
                        <span id={`item_${key}`} key={key} onClick={scrollOnClick.bind(key)} className="dashboard__controls__item"></span>
                    )
                })}
                <span id={`item_${schedule.length}`} key={schedule.lenght} onClick={scrollOnClick.bind(schedule.length)} className="dashboard__controls__item"></span>
            </div>
        </div>
    );
};

export default Dashboard;
