// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'expanded' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'expanded' implicitly has an 'any'... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onToggle' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ExpandButton.module.css' or ... Remove this comment to see the full error message
import { expandButton } from './ExpandButton.module.css';

const ExpandButton = ({ expanded, onToggle }) => (
    <button className={expandButton} onClick={onToggle}>
        {expanded ? '-' : '+'}
    </button>
);

export default ExpandButton;
