// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
import { connect } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'path' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'path' implicitly has an 'any' typ... Remove this comment to see the full error message
import { Redirect } from 'react-router-dom';
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userRoles' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
import { SecureRoute } from '@okta/okta-react';

import userHasRoles from 'utils/auth';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message
const ProtectedRoute = ({
    path, component: Component, requiredRoles, userRoles, ...rest
}) => (
    <SecureRoute
        {...rest}
        exact
        path={path}
        component={() => (userHasRoles(userRoles, requiredRoles) ? (
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'path' does not exist on type 'ProtectedR... Remove this comment to see the full error message
            <Component {...rest} />
        ) : (
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            <Redirect to={{ pathname: '/', state: { from: path } }} />
        ))}
    />
);
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message

ProtectedRoute.propTypes = {
    ...SecureRoute.propTypes,
    component: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
    requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    userRoles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message
const mapStateToProps = ({ user }) => ({
    userRoles: user.info && user.info.roles ? user.info.roles : [],
});

export default connect(mapStateToProps)(ProtectedRoute);
