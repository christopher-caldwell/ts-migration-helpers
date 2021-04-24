import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TabItem extends Component {
    render() {
        const {
            props: { activeTab, label, linkTo, name },
        } = this;

        const className = activeTab === name ? 'tab-item tab-item--active' : 'tab-item';

        return (
            <Link to={linkTo}>
                <li className={className}>{label}</li>
            </Link>
        );
    }
}

TabItem.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default TabItem;
