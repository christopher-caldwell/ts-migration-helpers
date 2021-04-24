import React from 'react';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import request from 'utils/request';
import { setAuth } from 'utils/oktaAuth';
import { getCategoriesMetadata } from 'stores/categories/categoriesActions';
import { loadUser, loadUserPreferences } from 'stores/user/userActions';

class AuthenticatedPage extends React.Component {
    constructor(props) {
        super(props);
        this.getToken = this.getToken.bind(this);
        this.state = {
            user: {
                name: null,
                token: null,
                authenticated: null,
            },
        };
        this.getToken();
        setAuth(props.auth);
    }

    loadUserData = payload => {
        const { getCategoriesMetadataAction, loadUserAction, loadUserPreferencesAction } = this.props;
        getCategoriesMetadataAction();
        loadUserAction(payload);
        loadUserPreferencesAction(payload.userId);
    };

    getToken = async () => {
        try {
            const { auth } = this.props;
            const { user } = this.state;

            const token = (await auth.getAccessToken()) || null;
            const oktaStorage = JSON.parse(window.localStorage.getItem('okta-token-storage'));
            const name = (get(oktaStorage, 'idToken') && get(oktaStorage, 'idToken.claims.name')) || null;
            const authenticated = await auth.isAuthenticated();
            if (token !== user.token) {
                this.setState({ user: { token, name, authenticated } });
                if (token) {
                    const options = { method: 'GET' };
                    const payload = await request('/auth/exchange', options);
                    this.loadUserData(payload);
                }
            }
        } catch (err) {
            console.error('error during token exchange ', err);
        }
    };

    componentDidUpdate() {
        this.getToken();
    }

    getChildContext() {
        const { user } = this.state;
        return { user };
    }

    render() {
        const { children } = this.props;
        return <div className="authenticated-page">{children}</div>;
    }
}

AuthenticatedPage.propTypes = {
    auth: PropTypes.shape().isRequired,
    getCategoriesMetadataAction: PropTypes.func.isRequired,
    loadUserAction: PropTypes.func.isRequired,
    loadUserPreferencesAction: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
};

AuthenticatedPage.defaultProps = { children: null };

AuthenticatedPage.contextTypes = { router: PropTypes.shape().isRequired };

AuthenticatedPage.childContextTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        token: PropTypes.string,
        authenticated: PropTypes.bool,
    }),
};

const mapDispatchToProps = {
    getCategoriesMetadataAction: getCategoriesMetadata,
    loadUserAction: loadUser,
    loadUserPreferencesAction: loadUserPreferences,
};

export default withAuth(connect(null, mapDispatchToProps)(AuthenticatedPage));
