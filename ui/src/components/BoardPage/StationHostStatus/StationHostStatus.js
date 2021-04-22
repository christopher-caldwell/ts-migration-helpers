import React from 'react';
import PropTypes from 'prop-types';

const CONSTANTS = {
    CONNECTED: 'Connected to GSelector',
    NOT_CONNECTED: 'Not Connected to GSelector',
    FC: 'format_center',
};

const StationHostStatus = ({ pollerEnabled, stationHostType }) => {
    const renderElement = hostStatus => <div className="station-status">{hostStatus}</div>;
    const statusText = pollerEnabled ? CONSTANTS.CONNECTED : CONSTANTS.NOT_CONNECTED;
    const formatCenterStation = stationHostType === CONSTANTS.FC ? '*' : '';
    const hostStatus = `${statusText} ${formatCenterStation}`;
    return renderElement(hostStatus);
};

StationHostStatus.propTypes = {
    pollerEnabled: PropTypes.bool,
    stationHostType: PropTypes.string,
};

export default StationHostStatus;
