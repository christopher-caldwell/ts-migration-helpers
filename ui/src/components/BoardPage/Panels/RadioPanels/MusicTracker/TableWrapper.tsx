import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';

import MetricDetail from 'components/BoardPage/Panels/RadioPanels/MusicTracker/MetricDetail';

const TableWrapper = props => {
    const {
        similarStations: { open, docked },
        children,
    } = props;
    const sidebar = open ? (
        <div className="sidebar">
            <MetricDetail />
        </div>
    ) : (
        <span />
    );

    const sidebarProps = {
        rootClassName: 'root',
        sidebarClassName: 'customSidebar',
        contentClassName: 'customContent',
        docked,
        open,
        pullRight: true,
        sidebar,
    };

    return (
        <div>
            <Sidebar {...sidebarProps}>{children}</Sidebar>
        </div>
    );
};

TableWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    similarStations: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({ similarStations: state.similarStations });

export default connect(mapStateToProps)(TableWrapper);
