import React from 'react';

import { customCheckbox, checkboxLabel, checkboxInput } from './Checkbox.module.css';

const Checkbox = ({ id, isChecked, handleCheck }) => (
    <div className={customCheckbox}>
        <label htmlFor={id} className={checkboxLabel}>
            <input
                id={id}
                className={checkboxInput}
                value={id}
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
            />
        </label>
    </div>
);

export default Checkbox;
