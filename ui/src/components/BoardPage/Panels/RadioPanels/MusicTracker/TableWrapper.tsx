// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import MetricDetail from 'components/BoardPage/Panels/RadioPanels/MusicTracker/MetricDetail';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            <Sidebar {...sidebarProps}>{children}</Sidebar>
        </div>
    );
};

TableWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    similarStations: PropTypes.shape().isRequired,
};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.

const mapStateToProps = state => ({ similarStations: state.similarStations });

export default connect(mapStateToProps)(TableWrapper);
