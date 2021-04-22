import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';

const SyncStatus = ({
    boxData, stagedSongs, stagedDayparts, stagedRestrictions,
}) => {
    const renderElement = syncStatusElement => <div className="sync-status">{syncStatusElement}</div>;

    // ML-6317 - helper function to determine which icon will be displayed on the
    // tool tip based on the status
    const checkStatus = status => (status === 'synchronizing' ? 'warning' : 'info');

    const renderTooltip = (message, statusStyle, statusText) => (
        <OverlayTrigger
            overlay={
                (
                    <CustomTooltip type={checkStatus(statusStyle)} title={statusText} top={5}>
                        {message}
                    </CustomTooltip>
                )
            }
            placement="left"
            delayHide={100}
        >
            <p className={`sync-status__info sync-status__info--${statusStyle}`}>{statusText}</p>
        </OverlayTrigger>
    );

    let statusText = 'Synchronized';
    let message = null;
    let statusStyle = 'synchronized';
    let syncStatusElement = null;
    let hasTemplateToSync = false;

    if (boxData.templates) {
        const { hour_restriction, packet, daypart } = boxData.templates;
        hasTemplateToSync = hour_restriction.length > 0 || packet.length > 0 || daypart.length > 0;
    }

    if (stagedSongs.length > 0 || stagedRestrictions.length > 0 || stagedDayparts.length > 0) {
        statusText = 'Pending Approval';
        message = (
            <p className="custom-tooltip__text info">
                Your station is synchronized, but you have pending changes to approve.
            </p>
        );
        statusStyle = 'waiting';
        syncStatusElement = renderTooltip(message, statusStyle, statusText);

        return renderElement(syncStatusElement);
    }

    if ((boxData.closed && !boxData.synchronized) || hasTemplateToSync) {
        const lastSyncDate = boxData.lastSyncDate ? moment(boxData.lastSyncDate).format('MM/DD/YY h:mm:ss A') : null;
        statusText = 'Synchronizing';
        const lastSyncDateMessage = lastSyncDate ? (
            <span className="nowrap">
                {'Last Sync Date: '}
                {lastSyncDate}
            </span>
        ) : (
            ''
        );
        message = (
            // ML-6317 - replaced 'info' with 'warning' for correct css id
            <p className="custom-tooltip__text warning">
                {`
                    Once changes are approved, Music Lab will take up to 10 minutes to sync with
                    GSelector.
                `}
                {lastSyncDateMessage}
            </p>
        );
        statusStyle = 'synchronizing';
        syncStatusElement = renderTooltip(message, statusStyle, statusText);

        return renderElement(syncStatusElement);
    }

    syncStatusElement = <p className={`sync-status__info sync-status__info--${statusStyle}`}>{statusText}</p>;

    return renderElement(syncStatusElement);
};

SyncStatus.propTypes = {
    boxData: PropTypes.shape().isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedSongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SyncStatus;
