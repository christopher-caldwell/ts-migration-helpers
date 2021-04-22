import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { modal } from './Modal.module.css';

const modalMount = document.getElementById('modal');
const modalContainer = document.createElement('div');
modalContainer.classList.add(modal);

const Modal = ({ children, backgroundClick = () => {}, position }) => {
    useEffect(() => {
        modalMount.appendChild(modalContainer);
        return () => modalMount.removeChild(modalContainer);
    }, []);

    const childrenPositioned = (
        <div className={position} onClick={backgroundClick}>
            {children}
        </div>
    );

    return ReactDOM.createPortal(childrenPositioned, modalContainer);
};

export default Modal;
