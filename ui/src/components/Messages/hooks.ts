import { useState } from 'react';

const useMessageLocalStorage = localStorageKey => {
    const current = localStorage.getItem(localStorageKey);
    const initialState = current ? JSON.parse(current) : {};

    const [dismissedMessageIds, setDissmissedIds] = useState(initialState);

    const addNewMessageId = newMessageId => {
        const newIdsObj = { ...dismissedMessageIds, [newMessageId]: true };
        localStorage.setItem(localStorageKey, JSON.stringify(newIdsObj));
        setDissmissedIds(newIdsObj);
    };

    return [dismissedMessageIds, addNewMessageId];
};

export default useMessageLocalStorage;
