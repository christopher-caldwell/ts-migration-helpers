import React from 'react';

import { customCheckbox } from './Checkbox.module.scss';

const Checkbox = ({ id, isChecked, handleCheck }) => (
    <div className={customCheckbox}>
        <input id={id} value={id} type="checkbox" checked={isChecked} onChange={handleCheck} />
        <label htmlFor={id} />
    </div>
);

export default Checkbox;
