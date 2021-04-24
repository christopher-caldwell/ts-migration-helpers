import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import request from 'utils/request';
import Message from './Message';
import useMessageLocalStorage from './hooks';

import { messagesContainer } from './messages.module.scss';

const messagesRoot = document.getElementById('messages');
const element = document.createElement('div');
element.classList.add(messagesContainer);

const messagesLocalStorageKey = 'dismissedMessages';

const Messages = ({ type }) => {
    const [activeMessages, setMessages] = useState([]);
    const [dismissedMessageIds, setNewDismissedId] = useMessageLocalStorage(messagesLocalStorageKey);

    const messagesToDisplay = activeMessages
        .filter(({ id }) => !dismissedMessageIds[id] || false)
        .map(({ message, id }) => (
            <Message key={id} id={id} text={message} markAsDismissed={() => setNewDismissedId(id)} />
        ));

    useEffect(() => {
        const getActiveMessages = async () => {
            try {
                const messages = await request(type === 'private' ? '/user/messages' : '/messages');
                messagesRoot.appendChild(element);
                return setMessages(messages);
            } catch (error) {
                console.error('something went wrong with retrieving messages: ', error);
            }
        };
        getActiveMessages();
        return () => {
            if (messagesRoot.hasChildNodes()) messagesRoot.removeChild(element);
        };
    }, [type]);

    useEffect(() => {
        // removes container if all messages dismissed, container was covering bottom bar
        if (!messagesToDisplay.length && messagesRoot.hasChildNodes()) {
            messagesRoot.removeChild(element);
        }
    }, [messagesToDisplay]);

    return ReactDOM.createPortal(messagesToDisplay, element);
};

export default Messages;
