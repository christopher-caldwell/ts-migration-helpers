import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import OktaSignInWidget from 'components/OktaSignInWidget';
import Messages from 'components/Messages';
import { oktaAuth } from 'utils/oktaAuth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.state = {
            loading: true,
            authenticated: null,
        };
    }

    async componentDidMount() {
        await this.checkAuthentication();
    }

    async checkAuthentication() {
        try {
            const { authenticated } = this.state;
            this.setState({ loading: true });
            const isAuthenticated = await oktaAuth.isAuthenticated();
            if (isAuthenticated !== authenticated) {
                this.setState({
                    loading: false,
                    authenticated: isAuthenticated,
                });
            }
        } catch (err) {
            console.error('error validating if user is authenticated: ', err);
        }
    }

    clearStorage = () => {
        window.localStorage.removeItem('okta-cache-storage');
        window.localStorage.removeItem('okta-token-storage');
    };

    onSuccess(res) {
        if (res.status === 'SUCCESS') {
            return oktaAuth.redirect({
                sessionToken: res.session.token,
            });
        }
        return this.clearStorage();
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        // https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }

    onError(err) {
        this.clearStorage();
        console.error('error logging in ', err);
    }

    render() {
        const { baseUrl } = this.props;
        const { loading, authenticated } = this.state;

        if (loading) return null;

        if (authenticated) {
            return <Redirect to="/home" />;
        }

        return (
            <>
                <OktaSignInWidget baseUrl={baseUrl} onSuccess={this.onSuccess} onError={this.onError} />
                <Messages type="public" />
            </>
        );
    }
}

export default Login;
