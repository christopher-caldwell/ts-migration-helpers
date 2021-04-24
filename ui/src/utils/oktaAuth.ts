let oktaAuth = {}; // eslint-disable-line
// TODO: refactor

const setAuth = newAuth => {
    oktaAuth = newAuth;
};

const oktaLogout = (logoutPath = '/logout') => {
    window.localStorage.removeItem('okta-cache-storage');
    window.localStorage.removeItem('okta-token-storage');
    if (oktaAuth.logout) {
        oktaAuth.logout(logoutPath);
    }
};

export { oktaAuth, setAuth, oktaLogout };
