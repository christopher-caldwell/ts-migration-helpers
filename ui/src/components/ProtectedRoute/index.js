import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';

import userHasRoles from 'utils/auth';

const ProtectedRoute = ({
    path, component: Component, requiredRoles, userRoles, ...rest
}) => (
    <SecureRoute
        {...rest}
        exact
        path={path}
        component={() => (userHasRoles(userRoles, requiredRoles) ? (
            <Component {...rest} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: path } }} />
        ))}
    />
);

ProtectedRoute.propTypes = {
    ...SecureRoute.propTypes,
    component: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
    requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    userRoles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ user }) => ({
    userRoles: user.info && user.info.roles ? user.info.roles : [],
});

export default connect(mapStateToProps)(ProtectedRoute);
