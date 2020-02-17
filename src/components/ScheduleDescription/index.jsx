import React from 'react';

import './style.css';

const ScheduleDescription = ({day, month, weekDay}) => {
    return (
        <div className="scheduleDescription">
            <span className="scheduleDescription__weekday">{weekDay}</span>
            <span className="scheduleDescription__date">{day} de {month}</span>
        </div>
    )
};

export default ScheduleDescription;
