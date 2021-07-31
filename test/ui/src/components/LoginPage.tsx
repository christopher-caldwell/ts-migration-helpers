import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import OktaSignInWidget from 'components/OktaSignInWidget';
import Messages from 'components/Messages';
import { oktaAuth } from 'utils/oktaAuth';

class Login extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.state = {
            loading: true,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'authenticated' does not exist on type 'R... Remove this comment to see the full error message
            authenticated: null,
        };
    }

    async componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAuthenticated' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'authenticated' does not exist on type 'R... Remove this comment to see the full error message
        await this.checkAuthentication();
    }

    async checkAuthentication() {
        try {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAuthenticated' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'authenticated' does not exist on type 'R... Remove this comment to see the full error message
            const { authenticated } = this.state;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'redirect' does not exist on type '{}'.
            this.setState({ loading: true });
            const isAuthenticated = await oktaAuth.isAuthenticated();
            if (isAuthenticated !== authenticated) {
                this.setState({
                    loading: false,
                    authenticated: isAuthenticated,
                });
            }
        } catch (err) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'baseUrl' does not exist on type 'Readonl... Remove this comment to see the full error message
            console.error('error validating if user is authenticated: ', err);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'redirect' does not exist on type '{}'.
        }
    }

    clearStorage = () => {
        window.localStorage.removeItem('okta-cache-storage');
        window.localStorage.removeItem('okta-token-storage');
    };

    onSuccess(res) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'res' implicitly has an 'any' type.
        if (res.status === 'SUCCESS') {
            return oktaAuth.redirect({
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
                sessionToken: res.session.token,
            });
        }
        return this.clearStorage();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'baseUrl' does not exist on type 'Readonl... Remove this comment to see the full error message
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        // https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }

    onError(err) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
        this.clearStorage();
        console.error('error logging in ', err);
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'baseUrl' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { baseUrl } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
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
