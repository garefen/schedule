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
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [schedule, setSchedule] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const [user, setUser] = useState({});

    const { setAuthTokens } = useAuth();

    useEffect(() => {
        const getAppointments = async () => {
            showLoader();
            const { data } = await api.post('/appointment', { userId: JSON.parse(localStorage.getItem("tokens"))._id });
            const response = await api.post('/user', { userId: JSON.parse(localStorage.getItem("tokens"))._id })
            setSchedule(data);
            setUser(response.data);
            hideLoader();
        }
        getAppointments();
    }, []);

    const logout = () => {
        showLoader();
        setTimeout(() => {
            setAuthTokens();
            localStorage.removeItem("tokens");
            setRedirect(true);
        }, 1000);
    }

    if (redirect) {
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard__add">
                <Link to='/add' id="cta_button__add" className="dashboard__add__button active clip">
                    <span>+</span>
                    <p>Adicionar compromisso</p>
                </Link>
            </div>
            <div className="dashboard__logout">
                <button onClick={logout}>Sair</button>
            </div>
            { schedule.length === 0 ? 
            <>
                <div className="dashboard__slider__item__lastSlide">
                    <span className="dashboard__slider__item__lastSlide__title">
                        Sem compromissos
                    </span>
                    <img draggable='false' className='dashboard__slider__item__lastSlide__image' src={require('../../assets/idle.svg')} alt=""/>
                </div>
                {/* <div className="dashboard__slider__item__lastSlide__cta">
                    <Link to='/add' className="dashboard__slider__item__lastSlide__cta__button">+</Link>
                </div> */}
            </>
            :
            
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={schedule.length}
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
                        {/* <Slide index={schedule.length} className="dashboard__slider__item">
                            <div className="dashboard__slider__item__lastSlide">
                                <span className="dashboard__slider__item__lastSlide__title">
                                    Adicione um compromisso
                                </span>
                                <img draggable='false' className='dashboard__slider__item__lastSlide__image' src={require('../../assets/idle.svg')} alt=""/>
                            </div>
                            <div className="dashboard__slider__item__lastSlide__cta">
                                <Link to='/add' className="dashboard__slider__item__lastSlide__cta__button">+</Link>
                            </div>
                        </Slide> */}
                    </Slider>
                    <DotGroup />
                </CarouselProvider>
            }
        </div>
    );
};

export default Dashboard;
