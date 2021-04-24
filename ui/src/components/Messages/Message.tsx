import React from 'react';

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
