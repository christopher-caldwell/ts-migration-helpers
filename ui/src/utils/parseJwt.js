/**
 * Return payload of JSON Web Token
 *
 * @param {string} token
 *
 * @returns {*}
 */
function parseJwt(token) {
    const payload = token.split('.')[1];

    return JSON.parse(window.atob(payload));
}

export default parseJwt;
