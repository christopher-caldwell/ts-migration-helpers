// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { useState, useEffect } from 'react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'auth' implicitly has an 'any' typ... Remove this comment to see the full error message
import { Redirect } from 'react-router-dom';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupName' implicitly has an 'any' type... Remove this comment to see the full error message
import { withAuth } from '@okta/okta-react';
import { oktaAuth } from 'utils/oktaAuth';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'auth' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
const OKTA_UNASSIGNED_MSG = 'User is not assigned to the client application.';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
const hasGroupAccess = groups =>
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupName' implicitly has an 'any' type... Remove this comment to see the full error message
    groups && groups.length !== 0 && groups.find(groupName => groupName.includes('MusicLab'));

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'auth' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
const CustomImplicitCallback = ({ auth }) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                await auth.handleAuthentication();
                const user = await auth.getUser();
                if (!hasGroupAccess(user.groups)) {
                    throw new Error(OKTA_UNASSIGNED_MSG);
                }
                setAuthenticated(true);
            } catch (err) {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                console.error(`error during Okta authentication: ${err}`);
                if (err.message === OKTA_UNASSIGNED_MSG) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logout' does not exist on type '{}'.
                    oktaAuth.logout('/unauthorized');
                } else {
                    oktaAuth.logout();
                }
            }
        };
        handleAuth();
    }, [auth, setAuthenticated]);

    if (!authenticated) return null;

    const referrerKey = 'secureRouterReferrerPath';
    const location = JSON.parse(localStorage.getItem(referrerKey) || '{ "pathname": "/" }');
    localStorage.removeItem(referrerKey);

    return <Redirect to={location} />;
};

CustomImplicitCallback.propTypes = {
    auth: PropTypes.shape().isRequired,
};

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
export default withAuth(CustomImplicitCallback);
