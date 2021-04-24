import React from 'react';

import { stationStatus } from './StationHostStatus.module.scss';

const CONSTANTS = {
    CONNECTED: 'Connected to GSelector',
    NOT_CONNECTED: 'Not Connected to GSelector',
    FC: 'format_center',
};

const StationHostStatus = ({ pollerEnabled, stationHostType }) => {
    const renderElement = hostStatus => <div className={stationStatus}>{hostStatus}</div>;
    const statusText = pollerEnabled ? CONSTANTS.CONNECTED : CONSTANTS.NOT_CONNECTED;
    const formatCenterStation = stationHostType === CONSTANTS.FC ? '*' : '';
    const hostStatus = `${statusText} ${formatCenterStation}`;

    return renderElement(hostStatus);
};

export default StationHostStatus;
