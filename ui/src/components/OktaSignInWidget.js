import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import musiclabLogo from 'images/music-lab-logo.png';

const oktaConstructorParams = baseUrl => ({
    baseUrl,
    logo: musiclabLogo,
    logoText: 'Music Lab @ iHeartMedia Inc.',
    authParams: {
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
