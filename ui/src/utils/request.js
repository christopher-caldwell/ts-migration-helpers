import merge from 'lodash/merge';
import history from 'history.js';
import { SERVICE_API_URL } from 'environment';
import { oktaAuth, oktaLogout } from 'utils/oktaAuth';

class RequestError extends Error {
    constructor(message) {
        super(message);

        this.message = message.message;
        this.response = message.response;
    }

    toString() {
        return this.message;
    }
}

function queryString(params) {
    if (params === undefined || params === null) {
        return '';
    }

    if (Object.keys(params).length === 0) {
        return '';
    }

    const query = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    return `?${query}`;
}

// Base options that can be overridden
const baseOptions = {
    headers: {
        Accept: 'application/json',
    },
};

function fetchRequest(url, options, overrides) {
    return fetch(
        // eslint-disable-line
        `${SERVICE_API_URL}${url}${queryString(options.params)}`,
        merge({}, baseOptions, options, overrides),
    ).then(response => {
        if (response.ok) {
            return response.json();
        }

        // Should handle expired credentials vs. unauthorized
        if (response.status === 401) {
            console.error('The token has expired, logging out');
            oktaLogout();
        } else if (response.status === 403) {
            console.error('Unauthorized access');
            history.push('/unauthorized');
        }
        throw new RequestError({
            message: 'Network response was not OK.',
            response,
        });
    });
}

/**
 * Simple wrapper around the fetch API to make calls in the application easier.
 *
 * @param {string} url
 * @param {object} options
 *
 * @returns {Promise}
 */
const request = async (url, options = {}) => {
    // Always-enabled options
    const overrides = { headers: {} };

    // this function will refresh the token automatically if necessary
    overrides.headers.Authorization = await oktaAuth.getAccessToken();

    // Automatically set headers to expect JSON transmissions
    if (options.body !== undefined) {
        overrides.headers['Content-Type'] = 'application/json';
        overrides.body = JSON.stringify(options.body);
    }

    return fetchRequest(url, options, overrides);
};

export { request as default, baseOptions };
