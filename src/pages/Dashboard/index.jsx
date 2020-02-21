import React, { useState, useEffect } from 'react';

import { showLoader, hideLoader } from '../../services/loader';

import {
    Link,
    Redirect
} from 'react-router-dom';

import './style.css';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Schedule from '../../components/Schedule';
import ScheduleDescription from '../../components/ScheduleDescription';

import api from '../../services/api'

const Dashboard = ({ cookies }) => {
    const [schedule, setSchedule] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const [user, setUser] = useState({});

    useEffect(() => {
        const getAppointments = async () => {
            showLoader();
            const { data } = await api.post('/appointment', { userId: cookies.get('userId') });
            const response = await api.post('/user', { userId: cookies.get('userId') })
            setSchedule(data);
            setUser(response.data);
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
        showLoader();
        setTimeout(() => {

            cookies.remove('userId');
            setRedirect(true);
        }, 1000);
    }

    return (
        <div className="dashboard">
            {redirect && <Redirect to='/login'/>}
            <div className="dashboard__add">
                <Link to='/add' id="cta_button__add" className="dashboard__add__button active">+</Link>
            </div>
            <div className="dashboard__logout">
                <button onClick={logout}>({user.name}) Sair</button>
            </div>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={schedule.length + 1}
                className="dashboard__slider"
            >
                <Slider>
                    {schedule.map((item, key) => {
                        return (
                            <Slide index={key} key={key} className="dashboard__slider__item">
                                <Schedule item={item} />
                                <ScheduleDescription weekDay={item.weekday} day={item.day} month={item.month}/>
                            </Slide>
                        )
                    })}
                    <Slide index={schedule.length} className="dashboard__slider__item">
                        <div className="dashboard__slider__item__lastSlide">
                                <span className="dashboard__slider__item__lastSlide__title">
                                    Adicione um compromisso
                                </span>
                                <img draggable='false' className='dashboard__slider__item__lastSlide__image' src={require('../../assets/idle.svg')} alt=""/>
                            </div>
                            <div className="dashboard__slider__item__lastSlide__cta">
                                <Link to='/add' className="dashboard__slider__item__lastSlide__cta__button">+</Link>
                        </div>
                    </Slide>
                </Slider>
                <DotGroup />
            </CarouselProvider>
        </div>
    );
};

export default Dashboard;
