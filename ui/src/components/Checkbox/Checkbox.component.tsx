// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Checkbox.module.css' or its ... Remove this comment to see the full error message
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
