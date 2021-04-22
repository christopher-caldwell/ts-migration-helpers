import React from 'react';

import { closeButton, xIcon } from './CloseButton.module.css';

const CloseButton = ({ onClose, extraStyle = '' }) => (
    <button className={`${closeButton}${extraStyle && ` ${extraStyle}`}`} onClick={onClose}>
        <i className={xIcon} />
    </button>
);

export default CloseButton;
