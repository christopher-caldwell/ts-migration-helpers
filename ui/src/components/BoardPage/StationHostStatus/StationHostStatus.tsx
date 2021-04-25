// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
import PropTypes from 'prop-types';

const CONSTANTS = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hostStatus' implicitly has an 'any' typ... Remove this comment to see the full error message
    CONNECTED: 'Connected to GSelector',
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
    NOT_CONNECTED: 'Not Connected to GSelector',
    FC: 'format_center',
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hostStatus' implicitly has an 'any' typ... Remove this comment to see the full error message
const StationHostStatus = ({ pollerEnabled, stationHostType }) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hostStatus' implicitly has an 'any' typ... Remove this comment to see the full error message
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
