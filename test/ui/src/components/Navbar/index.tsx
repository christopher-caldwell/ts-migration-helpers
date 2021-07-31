import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Avatar from 'react-avatar';
import { MenuItem, NavDropdown, Navbar, Nav } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/i-heart.svg' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/i-heart.svg' or its cor... Remove this comment to see the full error message
import { withAuth } from '@okta/okta-react';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/musiclab.svg' or its co... Remove this comment to see the full error message
import Search from 'components/Search';
import Image from 'components/Utilities/Image';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/i-heart.svg' or its cor... Remove this comment to see the full error message
import iheartLogo from 'images/i-heart.svg';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/musiclab.svg' or its co... Remove this comment to see the full error message
import musiclabLogo from 'images/musiclab.svg';
import Messages from 'components/Messages';
import { oktaLogout } from 'utils/oktaAuth';

import { TEAM_ADMIN, SITE_ADMIN, DIRECTOR_ADMINS, DIRECTOR_USERS } from 'constants/roles';
import ProtectedContent from '../ProtectedContent';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message
import Navigation from '../Navigation';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
class NavbarHeader extends Component {
    render() {
        const { user } = this.context;
        const { location } = this.props;

        if ((user && !user.authenticated) || location.pathname === '/not-found') return null;

        return (
            user &&
            user.token && (
                <Navbar fixedTop fluid>
                    <Navbar.Header>
                        <Navbar.Brand className="navbar__brand-company">
                            <Link to="/">
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message */}
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message */}
                                <Image alt="Logo" className="navbar__brand-company-img" src={iheartLogo} />
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message */}
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Brand className="navbar__brand">
                            <Link to="/">
                                <Image alt="Logo" className="navbar__brand-img" src={musiclabLogo} />
                            </Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navigation match={this.props.match} />
                    <Search />
                    {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message */}
                    <div className="navbar__right-elements">
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message */}
                        <div className="profile">
                            <div className="profile__container">
                                <Avatar
                                    alt="Avatar"
                                    className="profile__image"
                                    name={user.name}
                                    round
                                    size={30}
                                    textSizeRatio={2}
                                    color="#d00202"
                                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                                // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string | ... Remove this comment to see the full error message
                                />
                                <span className="profile__name">{user.name}</span>
                            </div>
                        </div>
                        {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                        <Nav pullRight activeKey={2}>
                            <NavDropdown
                                id="nav-links-header"
                                className="custom-navbar-menu"
                                // @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
                                title={<i className="fa fa-list" />}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                eventKey={3}
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                pullRight
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                noCaret
                            >
                                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                                <ProtectedContent
                                    userRoles={user.roles}
                                    requiredRoles={[DIRECTOR_ADMINS, DIRECTOR_USERS]}
                                >
                                    <LinkContainer to="/director">
                                        {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                                        <MenuItem eventKey={3.2} onClick={() => document.querySelector('body').click()}>
                                            Director Dashboard
                                        {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                                        </MenuItem>
                                    </LinkContainer>
                                </ProtectedContent>
                                <LinkContainer to="/home">
                                    <MenuItem eventKey={3.3} active={location.pathname === '/'}>
                                        Radio Boards
                                    </MenuItem>
                                {/* @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message */}
                                </LinkContainer>
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                <ProtectedContent userRoles={user.roles} requiredRoles={[TEAM_ADMIN, SITE_ADMIN]}>
                                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                    <LinkContainer to="/board/users">
                                        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                                        <MenuItem onClick={() => document.querySelector('body').click()}>
                                            Account Management
                                        {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
                                        </MenuItem>
                                    </LinkContainer>
                                </ProtectedContent>
                                <MenuItem eventKey={3.5} href="#" onClick={() => oktaLogout()}>
                                    Logout
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    </div>
                    <Messages type="private" />
                </Navbar>
            )
        );
    }
}

NavbarHeader.contextTypes = {
    user: PropTypes.shape(),
};

NavbarHeader.propTypes = {
    location: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
    match: PropTypes.shape().isRequired,
};

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const mapStateToProps = ({ user }) => ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message
    userRoles: user.info && user.info.roles ? user.info.roles : [],
});

export default withAuth(connect(mapStateToProps)(NavbarHeader));
