let oktaAuth = {}; // eslint-disable-line
// TODO: refactor

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newAuth' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newAuth' implicitly has an 'any' type.
const setAuth = newAuth => {
    oktaAuth = newAuth;
};

const oktaLogout = (logoutPath = '/logout') => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
    window.localStorage.removeItem('okta-cache-storage');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
    window.localStorage.removeItem('okta-token-storage');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
    if (oktaAuth.logout) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
        oktaAuth.logout(logoutPath);
    }
};

export { oktaAuth, setAuth, oktaLogout };
