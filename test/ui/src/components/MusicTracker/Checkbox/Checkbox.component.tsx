// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handleCheck' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Checkbox.module.scss' or its... Remove this comment to see the full error message
import { customCheckbox } from './Checkbox.module.scss';

const Checkbox = ({ id, isChecked, handleCheck }) => (
    <div className={customCheckbox}>
        <input id={id} value={id} type="checkbox" checked={isChecked} onChange={handleCheck} />
        <label htmlFor={id} />
    </div>
);

export default Checkbox;
