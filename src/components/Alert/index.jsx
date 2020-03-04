import React from 'react';

import { MdClose } from 'react-icons/md'

import './style.css';

const Alert = ({ message, options, style, close }) => {
    return (
        <div className="alert">
            <span>{message}</span>
            <button onClick={close}>
                <MdClose />
            </button>
        </div>
    )
};

export default Alert;
