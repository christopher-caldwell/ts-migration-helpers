import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    activeTab: string;
    label: string;
    linkTo: string;
    name: string;
};

class TabItem extends Component<Props> {
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

export default TabItem;
