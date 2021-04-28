import React, { Component } from 'react';
import LeftSmall from './Left/LeftSmall';
import RightSmall from './Right/RightSmall';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Header extends Component {
    user = () => {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <ul className="mobile-nav-ul">
                        <li><Link to="/" onClick={this.props.toggleHeaderMenu}>Fleet Builder</Link></li>
                        <li><Link to="/contact" onClick={this.props.toggleHeaderMenu}>Contact</Link></li>
                        <li><a href="/auth/google" onClick={this.props.toggleHeaderMenu}>Log In</a></li>
                    </ul>
                );
            default:
                return (
                    <ul className="mobile-nav-ul long-ul">
                        <li><Link to="/" onClick={this.props.toggleHeaderMenu}>Fleet Builder</Link></li>
                        <li><Link to="/profile" onClick={this.props.toggleHeaderMenu}>Profile</Link></li>
                        <li><Link to="/contact" onClick={this.props.toggleHeaderMenu}>Contact</Link></li>
                        <li><Link to="/face-off" onClick={this.props.toggleHeaderMenu}>Head to Head</Link></li>
                        <li><a href="/api/logout" onClick={this.props.toggleHeaderMenu}>Log Out</a></li>
                    </ul>
                )
        }
    };
    render() {
        let style = "";
        if (this.props.headerMenuShown){
            style = "show-mobile-nav";
        }

        return (
            <React.Fragment>
                <div className="topnav small-nav row">
                    <div className="mobile-header-cont">
                        <LeftSmall/>
                        <RightSmall/>
                    </div>
                    <div className={`mobile-links ${style}`}>
                        {this.user()}
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        headerMenuShown: state.headerMenuShown
    }
};
export default withRouter(connect(mapStateToProps, actions)(Header));