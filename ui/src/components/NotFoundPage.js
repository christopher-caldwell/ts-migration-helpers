import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="auth-container main-container">
        <div className="o-form-content">
            <h2 className="okta-form-title">
                Music Lab does not recognize this page at this time. Let me take you &nbsp;
                <Link to="/home">Home</Link>
            </h2>
        </div>
    </div>
);

export default NotFound;
