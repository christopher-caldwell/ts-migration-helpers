// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClose' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClose' implicitly has an 'any' ... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CloseButton.module.css' or i... Remove this comment to see the full error message
import { closeButton, xIcon } from './CloseButton.module.css';

const CloseButton = ({ onClose, extraStyle = '' }) => (
    <button className={`${closeButton}${extraStyle && ` ${extraStyle}`}`} onClick={onClose}>
        <i className={xIcon} />
    </button>
);

export default CloseButton;
