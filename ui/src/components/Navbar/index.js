import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Avatar from 'react-avatar';
import { MenuItem, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { withAuth } from '@okta/okta-react';

import Search from 'components/Search';
import Image from 'components/Utilities/Image';
import iheartLogo from 'images/i-heart.svg';
import musiclabLogo from 'images/musiclab.svg';
import Messages from 'components/Messages';
import { oktaLogout } from 'utils/oktaAuth';

import { TEAM_ADMIN, SITE_ADMIN, DIRECTOR_ADMINS, DIRECTOR_USERS } from 'constants/roles';
import ProtectedContent from '../ProtectedContent';
import Navigation from '../Navigation';

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
                                <Image alt="Logo" className="navbar__brand-company-img" src={iheartLogo} />
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
                    <div className="navbar__right-elements">
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
                                />
                                <span className="profile__name">{user.name}</span>
                            </div>
                        </div>
                        <Nav pullRight activeKey={2}>
                            <NavDropdown
                                id="nav-links-header"
                                className="custom-navbar-menu"
                                title={<i className="fa fa-list" />}
                                eventKey={3}
                                pullRight
                                noCaret
                            >
                                <ProtectedContent
                                    userRoles={user.roles}
                                    requiredRoles={[DIRECTOR_ADMINS, DIRECTOR_USERS]}
                                >
                                    <LinkContainer to="/director">
                                        <MenuItem eventKey={3.2} onClick={() => document.querySelector('body').click()}>
                                            Director Dashboard
                                        </MenuItem>
                                    </LinkContainer>
                                </ProtectedContent>
                                <LinkContainer to="/home">
                                    <MenuItem eventKey={3.3} active={location.pathname === '/'}>
                                        Radio Boards
                                    </MenuItem>
                                </LinkContainer>
                                <ProtectedContent userRoles={user.roles} requiredRoles={[TEAM_ADMIN, SITE_ADMIN]}>
                                    <LinkContainer to="/board/users">
                                        <MenuItem onClick={() => document.querySelector('body').click()}>
                                            Account Management
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
    match: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ user }) => ({
    userRoles: user.info && user.info.roles ? user.info.roles : [],
});

export default withAuth(connect(mapStateToProps)(NavbarHeader));
