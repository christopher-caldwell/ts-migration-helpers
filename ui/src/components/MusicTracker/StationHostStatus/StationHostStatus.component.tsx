// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHostStatus.module.scs... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationHostType' implicitly has a... Remove this comment to see the full error message
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
