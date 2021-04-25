import merge from 'lodash/merge';
import history from 'history.js';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
import { SERVICE_API_URL } from 'environment';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'response' does not exist on type 'Reques... Remove this comment to see the full error message
import { oktaAuth, oktaLogout } from 'utils/oktaAuth';

class RequestError extends Error {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    constructor(message) {
        super(message);

        this.message = message.message;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'response' does not exist on type 'Reques... Remove this comment to see the full error message
        this.response = message.response;
    }

    toString() {
        return this.message;
    }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
function queryString(params) {
    if (params === undefined || params === null) {
        return '';
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
    if (Object.keys(params).length === 0) {
        return '';
    }

    const query = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Authorization' does not exist on type '{... Remove this comment to see the full error message
        .join('&');

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getAccessToken' does not exist on type '... Remove this comment to see the full error message
    return `?${query}`;
}

// Base options that can be overridden
const baseOptions = {
    headers: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
        Accept: 'application/json',
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    },
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{ headers:... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
function fetchRequest(url, options, overrides) {
    return fetch(
        // eslint-disable-line
        `${SERVICE_API_URL}${url}${queryString(options.params)}`,
        merge({}, baseOptions, options, overrides),
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
    ).then(response => {
        if (response.ok) {
            return response.json();
        }

        // Should handle expired credentials vs. unauthorized
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Authorization' does not exist on type '{... Remove this comment to see the full error message
        if (response.status === 401) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getAccessToken' does not exist on type '... Remove this comment to see the full error message
            console.error('The token has expired, logging out');
            oktaLogout();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
        } else if (response.status === 403) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            console.error('Unauthorized access');
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{ headers:... Remove this comment to see the full error message
            history.push('/unauthorized');
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
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
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
 */
const request = async (url, options = {}) => {
    // Always-enabled options
    const overrides = { headers: {} };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Authorization' does not exist on type '{... Remove this comment to see the full error message
    // this function will refresh the token automatically if necessary
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getAccessToken' does not exist on type '... Remove this comment to see the full error message
    overrides.headers.Authorization = await oktaAuth.getAccessToken();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
    // Automatically set headers to expect JSON transmissions
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.body !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{ headers:... Remove this comment to see the full error message
        overrides.headers['Content-Type'] = 'application/json';
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type '{}'.
        overrides.body = JSON.stringify(options.body);
    }

    return fetchRequest(url, options, overrides);
};

export { request as default, baseOptions };
