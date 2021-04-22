import React from 'react';

import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';
import moment from 'moment';
import {
    syncStatus,
    syncStatusSynchronizedInfo,
    syncStatusSynchronizingInfo,
    syncStatusPendingApprovalInfo,
    nowrapSyncStatus,
    customTooltipSynchronizingText,
    customTooltipPendingText,
} from './SyncStatus.module.scss';

const SyncStatus = ({
    closedBox,
    closedBoxIsClosed,
    closedBoxTemplates,
    lengthOfStagedSongsArray,
    lengthOfstagedRestrictionsArray,
    lengthOfstagedDaypartsArray,
    pollerEnabled,
}) => {
    // variables used for the element render of the sync messages and tooltips
    let message = null;
    let syncStatusElement = null;
    let statusStyle = 'synchronized';
    let stationSyncStatus = 'Synchronized';

    // flag use to determine if a box has any templates saved in GSelector
    let hasTemplateToSync = false;
    if (closedBoxTemplates) {
        const { hour_restriction, packet, daypart } = closedBoxTemplates;
        hasTemplateToSync = hour_restriction.length > 0 || packet.length > 0 || daypart.length > 0;
    }

    const renderCombinedSyncStatus = (syncStatusElement, syncStatusCSS) => (
        <div className={`${syncStatus} ${syncStatusCSS}`}>{syncStatusElement}</div>
    );

    const checkStatus = status => (status === 'synchronizing' ? 'warning' : 'info');
    const renderTooltip = (message, statusStyle, statusText) => (
        <OverlayTrigger
            overlay={
                <CustomTooltip type={checkStatus(statusStyle)} title={statusText} top={5}>
                    {message}
                </CustomTooltip>
            }
            placement="left"
            delayHide={100}
        >
            <div>{statusText}</div>
        </OverlayTrigger>
    );

    // if connected to GSelector
    if (pollerEnabled) {
        // sync status is Synchronizing
        if ((closedBoxIsClosed && !closedBox.synchronized) || hasTemplateToSync) {
            const lastSyncDate = closedBox.lastSyncDate
                ? moment(closedBox.lastSyncDate).format('MM/DD/YY h:mm:ss A')
                : null;
            const lastSyncDateMessage = lastSyncDate ? (
                <span className={nowrapSyncStatus}>{`Last Sync Date:  ${lastSyncDate}`}</span>
            ) : (
                ''
            );
            message = (
                <p className={customTooltipSynchronizingText}>
                    {`
                    Once changes are approved, Music Lab will take up to 10 minutes to sync with
                    GSelector.
                `}
                    {lastSyncDateMessage}
                </p>
            );
            statusStyle = 'synchronizing';
            stationSyncStatus = `Synchronizing`;

            syncStatusElement = renderTooltip(message, statusStyle, stationSyncStatus);

            return renderCombinedSyncStatus(syncStatusElement, syncStatusSynchronizingInfo);
        }

        // sync status is Pending Approval
        if (lengthOfStagedSongsArray > 0 || lengthOfstagedRestrictionsArray > 0 || lengthOfstagedDaypartsArray > 0) {
            message = (
                <p className={customTooltipPendingText}>
                    Your station is synchronized, but you have pending changes to approve.
                </p>
            );
            statusStyle = 'waiting';
            stationSyncStatus = 'Pending Approval';
            syncStatusElement = renderTooltip(message, statusStyle, stationSyncStatus);

            return renderCombinedSyncStatus(syncStatusElement, syncStatusPendingApprovalInfo);
        }

        // sync status is Synchronized
        return <div className={`${syncStatus} ${syncStatusSynchronizedInfo}`}>{stationSyncStatus}</div>;
    }

    return '';
};

export default SyncStatus;
