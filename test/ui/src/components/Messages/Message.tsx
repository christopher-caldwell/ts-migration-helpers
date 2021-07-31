// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'text' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'text' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './messages.module.scss' or its... Remove this comment to see the full error message
import { message, messageText, messageButton } from './messages.module.scss';

const Message = ({ text, id, markAsDismissed }) => (
    <div className={message}>
        <p className={messageText}>{text}</p>
        <button className={messageButton} onClick={() => markAsDismissed(id)}>
            Dismiss
        </button>
    </div>
);

export default Message;
