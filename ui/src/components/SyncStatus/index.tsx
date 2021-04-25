// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boxData' implicitly has an 'any' ... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stagedRestrictions' implicitly ha... Remove this comment to see the full error message
import moment from 'moment';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'syncStatusElement' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boxData' implicitly has an 'any' ... Remove this comment to see the full error message
import { OverlayTrigger } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'status' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stagedDayparts' implicitly has an... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
import CustomTooltip from 'components/CustomTooltip';

const SyncStatus = ({
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'syncStatusElement' implicitly has an 'a... Remove this comment to see the full error message
    boxData, stagedSongs, stagedDayparts, stagedRestrictions,
}) => {
    const renderElement = syncStatusElement => <div className="sync-status">{syncStatusElement}</div>;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'status' implicitly has an 'any' type.
    // ML-6317 - helper function to determine which icon will be displayed on the
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'syncStatusElement' implicitly has an 'a... Remove this comment to see the full error message
    // tool tip based on the status
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
    const checkStatus = status => (status === 'synchronizing' ? 'warning' : 'info');

    const renderTooltip = (message, statusStyle, statusText) => (
        <OverlayTrigger
            overlay={
                (
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'status' implicitly has an 'any' type.
                    <CustomTooltip type={checkStatus(statusStyle)} title={statusText} top={5}>
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'statusStyle' implicitly has an 'any' ty... Remove this comment to see the full error message */}
                        {message}
                    </CustomTooltip>
                )
            }
            placement="left"
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any; type: string; title: any; t... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        );
        statusStyle = 'waiting';
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        syncStatusElement = renderTooltip(message, statusStyle, statusText);

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        return renderElement(syncStatusElement);
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // ML-6317 - replaced 'info' with 'warning' for correct css id
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            <p className="custom-tooltip__text warning">
                {`
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    Once changes are approved, Music Lab will take up to 10 minutes to sync with
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
