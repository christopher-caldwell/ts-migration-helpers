import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import request from 'utils/request';
import Message from './Message';
import useMessageLocalStorage from './hooks';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './messages.module.scss' or its... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './messages.module.scss' or its... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './messages.module.scss' or its... Remove this comment to see the full error message
import { messagesContainer } from './messages.module.scss';

const messagesRoot = document.getElementById('messages');
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
const element = document.createElement('div');
element.classList.add(messagesContainer);

const messagesLocalStorageKey = 'dismissedMessages';

const Messages = ({ type }) => {
    const [activeMessages, setMessages] = useState([]);
    const [dismissedMessageIds, setNewDismissedId] = useMessageLocalStorage(messagesLocalStorageKey);

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const messagesToDisplay = activeMessages
        .filter(({ id }) => !dismissedMessageIds[id] || false)
        .map(({ message, id }) => (
            <Message key={id} id={id} text={message} markAsDismissed={() => setNewDismissedId(id)} />
        ));

    useEffect(() => {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const getActiveMessages = async () => {
            try {
                const messages = await request(type === 'private' ? '/user/messages' : '/messages');
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                messagesRoot.appendChild(element);
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                return setMessages(messages);
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            } catch (error) {
                console.error('something went wrong with retrieving messages: ', error);
            }
        };
        getActiveMessages();
        return () => {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            if (messagesRoot.hasChildNodes()) messagesRoot.removeChild(element);
        };
    }, [type]);

    useEffect(() => {
        // removes container if all messages dismissed, container was covering bottom bar
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (!messagesToDisplay.length && messagesRoot.hasChildNodes()) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            messagesRoot.removeChild(element);
        }
    }, [messagesToDisplay]);

    return ReactDOM.createPortal(messagesToDisplay, element);
};

export default Messages;
