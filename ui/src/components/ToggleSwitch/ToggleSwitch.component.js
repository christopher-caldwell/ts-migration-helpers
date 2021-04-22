import React from 'react';

import { toggleContainer, toggle, circle, on } from './ToggleSwitch.module.css';

const ToggleSwitch = ({ switchedOn, onSwitch, switchKey }) => {
    const toggleSwitch = () => onSwitch(switchKey);
    return (
        <div className={toggleContainer}>
            <button className={toggle} onClick={toggleSwitch}>
                <div className={`${circle}${switchedOn ? ` ${on}` : ''}`} />
            </button>
        </div>
    );
};

export default ToggleSwitch;
