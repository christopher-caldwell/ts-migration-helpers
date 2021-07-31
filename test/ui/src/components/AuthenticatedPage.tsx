import React from 'react';
import { connect } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import { withAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import request from 'utils/request';
import { setAuth } from 'utils/oktaAuth';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { getCategoriesMetadata } from 'stores/categories/categoriesActions';
import { loadUser, loadUserPreferences } from 'stores/user/userActions';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
class AuthenticatedPage extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadUserAction' does not exist on type '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.getToken = this.getToken.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.state = {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoriesMetadataAction' does not ex... Remove this comment to see the full error message
            user: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadUserAction' does not exist on type '... Remove this comment to see the full error message
                name: null,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadUserPreferencesAction' does not exis... Remove this comment to see the full error message
                token: null,
                authenticated: null,
            },
        };
        this.getToken();
        setAuth(props.auth);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'payload' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    loadUserData = payload => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoriesMetadataAction' does not ex... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
        const { getCategoriesMetadataAction, loadUserAction, loadUserPreferencesAction } = this.props;
        getCategoriesMetadataAction();
        loadUserAction(payload);
        loadUserPreferencesAction(payload.userId);
    };

    getToken = async () => {
        try {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            const { auth } = this.props;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            const { user } = this.state;

            const token = (await auth.getAccessToken()) || null;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            const oktaStorage = JSON.parse(window.localStorage.getItem('okta-token-storage'));
            const name = (get(oktaStorage, 'idToken') && get(oktaStorage, 'idToken.claims.name')) || null;
            const authenticated = await auth.isAuthenticated();
            if (token !== user.token) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                this.setState({ user: { token, name, authenticated } });
                // @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
                if (token) {
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    const options = { method: 'GET' };
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'childContextTypes' does not exist on typ... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { user } = this.state;
        return { user };
    }

    render() {
        const { children } = this.props;
        return <div className="authenticated-page">{children}</div>;
    }
}

AuthenticatedPage.propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    auth: PropTypes.shape().isRequired,
    getCategoriesMetadataAction: PropTypes.func.isRequired,
    loadUserAction: PropTypes.func.isRequired,
    loadUserPreferencesAction: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
};

AuthenticatedPage.defaultProps = { children: null };

// @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
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
