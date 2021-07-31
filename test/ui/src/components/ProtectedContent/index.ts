import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userHasRoles from 'utils/auth';

const ProtectedContent = ({
    children,
    userRoles,
    requiredRoles,
    fallback = null
}: any) => {
    const showContent = userHasRoles(userRoles, requiredRoles);
    return showContent ? children : fallback;
};

ProtectedContent.propTypes = {
    children: PropTypes.node,
};

const mapStateToProps = ({
    user
}: any) => {
    const roles = user.info && user.info.roles;
    return {
        userRoles: roles || [],
    };
};

export default connect(mapStateToProps)(ProtectedContent);
