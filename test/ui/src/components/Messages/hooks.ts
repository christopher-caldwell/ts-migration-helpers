import { useState } from 'react';

const useMessageLocalStorage = (localStorageKey: any) => {
    const current = localStorage.getItem(localStorageKey);
    const initialState = current ? JSON.parse(current) : {};

    const [dismissedMessageIds, setDissmissedIds] = useState(initialState);

    const addNewMessageId = (newMessageId: any) => {
        const newIdsObj = { ...dismissedMessageIds, [newMessageId]: true };
        localStorage.setItem(localStorageKey, JSON.stringify(newIdsObj));
        setDissmissedIds(newIdsObj);
    };

    return [dismissedMessageIds, addNewMessageId];
};

export default useMessageLocalStorage;
