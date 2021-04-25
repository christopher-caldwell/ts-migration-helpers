export const MUSICLAB_STATE = 'musiclabState';
export const OKTA_TOKEN_STORE = 'okta-token-storage';

// TODO: this file needs to be deleted once app is tested without using local storage
const MusicLabLocalStorage = (storageKey: any) => ({
    loadState: () => {
        try {
            const serializedState = localStorage.getItem(storageKey);

            if (serializedState === null) {
                return undefined;
            }

            return JSON.parse(serializedState);
        } catch (err) {
            console.error(err.message, err);
            return undefined;
        }
    },

    saveState: (state: any) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(storageKey, serializedState);
        } catch (err) {
            console.error('localStorage saveState failed', err);
        }
    }
});

export default MusicLabLocalStorage;
