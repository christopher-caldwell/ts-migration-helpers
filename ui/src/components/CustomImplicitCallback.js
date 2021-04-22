import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { oktaAuth } from 'utils/oktaAuth';

const OKTA_UNASSIGNED_MSG = 'User is not assigned to the client application.';

const hasGroupAccess = groups =>
    groups && groups.length !== 0 && groups.find(groupName => groupName.includes('MusicLab'));

const CustomImplicitCallback = ({ auth }) => {
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
                console.error(`error during Okta authentication: ${err}`);
                if (err.message === OKTA_UNASSIGNED_MSG) {
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

export default withAuth(CustomImplicitCallback);
