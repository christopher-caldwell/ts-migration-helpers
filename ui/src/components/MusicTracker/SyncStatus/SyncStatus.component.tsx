// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';
import moment from 'moment';
import {
    syncStatus,
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
    syncStatusSynchronizedInfo,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBox' implicitly has an 'any... Remove this comment to see the full error message
    syncStatusSynchronizingInfo,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxIsClosed' implicitly has... Remove this comment to see the full error message
    syncStatusPendingApprovalInfo,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxTemplates' implicitly ha... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
    nowrapSyncStatus,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBox' implicitly has an 'any... Remove this comment to see the full error message
    customTooltipSynchronizingText,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxIsClosed' implicitly has... Remove this comment to see the full error message
    customTooltipPendingText,
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxTemplates' implicitly ha... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'syncStatusElement' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SyncStatus.module.scss' or i... Remove this comment to see the full error message
} from './SyncStatus.module.scss';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'status' implicitly has an 'any' type.
const SyncStatus = ({
    closedBox,
    closedBoxIsClosed,
    closedBoxTemplates,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    lengthOfStagedSongsArray,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'statusText' implicitly has an 'any' typ... Remove this comment to see the full error message
    lengthOfstagedRestrictionsArray,
    lengthOfstagedDaypartsArray,
    pollerEnabled,
}) => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
    // variables used for the element render of the sync messages and tooltips
    let message = null;
    let syncStatusElement = null;
    let statusStyle = 'synchronized';
    let stationSyncStatus = 'Synchronized';

    // flag use to determine if a box has any templates saved in GSelector
    let hasTemplateToSync = false;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'syncStatusElement' implicitly has an 'a... Remove this comment to see the full error message
    if (closedBoxTemplates) {
        const { hour_restriction, packet, daypart } = closedBoxTemplates;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'status' implicitly has an 'any' type.
        hasTemplateToSync = hour_restriction.length > 0 || packet.length > 0 || daypart.length > 0;
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    const renderCombinedSyncStatus = (syncStatusElement, syncStatusCSS) => (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
        <div className={`${syncStatus} ${syncStatusCSS}`}>{syncStatusElement}</div>
    );

    const checkStatus = status => (status === 'synchronizing' ? 'warning' : 'info');
    const renderTooltip = (message, statusStyle, statusText) => (
        <OverlayTrigger
            overlay={
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
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
