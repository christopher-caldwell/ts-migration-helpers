// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Modal.module.css' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Modal.module.css' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => () => HTMLDivElement' is n... Remove this comment to see the full error message
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Modal.module.css' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'position' implicitly has an 'any'... Remove this comment to see the full error message
import { modal } from './Modal.module.css';

// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
const modalMount = document.getElementById('modal');
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
const modalContainer = document.createElement('div');
modalContainer.classList.add(modal);

const Modal = ({ children, backgroundClick = () => {}, position }) => {
    useEffect(() => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => () => HTMLDivElement' is n... Remove this comment to see the full error message
        modalMount.appendChild(modalContainer);
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
