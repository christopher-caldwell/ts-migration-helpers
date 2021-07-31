// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'switchedOn' implicitly has an 'an... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'switchedOn' implicitly has an 'an... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ToggleSwitch.module.css' or ... Remove this comment to see the full error message
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
