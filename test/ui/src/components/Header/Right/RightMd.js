import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../css/Header.css';


class Right extends Component {
    user = () => {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <ul className="nav-links">
                        <li><Link to="/">Fleet Builder</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><a href="/auth/google">Log In</a></li>
                    </ul>
                );
            default:
                return (
                    <ul className="nav-links">
                        <li><Link to="/">Fleet Builder</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/face-off">Head to Head</Link></li>
                        <li><a href="/api/logout">Log Out</a></li>
                    </ul>
                )
        }
    };
    render(){

        return (
            <div className="nav-container span-3-of-4">
                {this.user()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
export default connect(mapStateToProps)(Right);