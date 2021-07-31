// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import React, { useEffect } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import OktaSignIn from '@okta/okta-signin-widget';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onSuccess' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'baseUrl' implicitly has an 'any' type.
import musiclabLogo from 'images/music-lab-logo.png';

const oktaConstructorParams = baseUrl => ({
    baseUrl,
    logo: musiclabLogo,
    logoText: 'Music Lab @ iHeartMedia Inc.',
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onSuccess' implicitly has an 'any... Remove this comment to see the full error message
    authParams: {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onError' implicitly has an 'any' ... Remove this comment to see the full error message
        pkce: true,
    },
    language: 'en',
    i18n: {
        en: {
            'primaryauth.title': 'SIGN IN', // Changes the sign in text
            'primaryauth.submit': 'LOGIN', // Changes the sign in button
            'primaryauth.username.placeholder': 'Email Address',
            'primaryauth.password.placeholder': 'Password',
        },
    },
    helpLinks: {
        help: `${window.location.origin}\\help`,
    },
    
});

const OktaSignInWidget = ({ onSuccess, onError, baseUrl }) => {
    useEffect(() => {
        const oktaParams = oktaConstructorParams(baseUrl);
        const OktaWidget = new OktaSignIn(oktaParams);
        OktaWidget.renderEl({ el: '#widget' }, onSuccess, onError);
        return () => {
            OktaWidget && OktaWidget.remove();
        };
    }, [ onSuccess, onError, baseUrl ]);

    return <div id="widget" />;
};

OktaSignInWidget.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default OktaSignInWidget;
