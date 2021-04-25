import React, { useState, useEffect } from 'react';

import request from 'utils/request';

import StationInfo from '../StationInfo/StationInfo.component';
import SyncStatus from '../SyncStatus/SyncStatus.component';
import StationHostStatus from '../StationHostStatus/StationHostStatus.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader.module.css' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader.module.css' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationHeader.module.css' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'lengthOfStagedSongsArray' implici... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'pollerEnabled' implicitly has an ... Remove this comment to see the full error message
import { stationHeaderContainer, stationInfo, radioTitle } from './StationHeader.module.css';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxIsClosed' implicitly has... Remove this comment to see the full error message
const StationHeader = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'closedBoxTemplates' implicitly ha... Remove this comment to see the full error message
    stationId,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'lengthOfStagedSongsArray' implici... Remove this comment to see the full error message
    hostInfo: { pollerEnabled, stationHostType },
    getHostInformationAction,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type '{ name: ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'lengthOfstagedDaypartsArray' impl... Remove this comment to see the full error message
    getBoxAction,
    closedBox,
    // @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'lookupTables' implicitly has an '... Remove this comment to see the full error message
    closedBoxIsClosed,
    closedBoxTemplates,
    lengthOfStagedSongsArray,
    lengthOfstagedRestrictionsArray,
    lengthOfstagedDaypartsArray,
    lookupTables,
}) => {
    const [station, setStation] = useState(false);

    useEffect(() => {
        getHostInformationAction(stationId);
    }, [getHostInformationAction, stationId]);

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ lengthOfstagedDaypartsArray: any; lengthOf... Remove this comment to see the full error message
    useEffect(() => {
        getBoxAction(stationId);
    }, [getBoxAction, stationId]);

    useEffect(() => {
        const getStation = async () => {
            try {
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ pollerEnabled: any; stationHostType: any; ... Remove this comment to see the full error message
                const newStation = await request(`/board/RadioBoard/${stationId}`);
                setStation(newStation);
            } catch (error) {
                console.error(error);
            }
        }
        if (!station) getStation();
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type '{ name: ... Remove this comment to see the full error message
    }, [stationId, station]);

    return station ? (
        <header className={stationHeaderContainer}>
            <div className={radioTitle}>
                {/* @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component. */}
                <StationInfo station={station} lookupTables={lookupTables} />
            </div>
            <div className={stationInfo}>
                {/* @ts-expect-error ts-migrate(2786) FIXME: 'SyncStatus' cannot be used as a JSX component. */}
                <SyncStatus
                    lengthOfstagedDaypartsArray={lengthOfstagedDaypartsArray}
                    lengthOfstagedRestrictionsArray={lengthOfstagedRestrictionsArray}
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ lengthOfstagedDaypartsArray: any; lengthOf... Remove this comment to see the full error message
                    lengthOfStagedSongsArray={lengthOfStagedSongsArray}
                    closedBoxTemplates={closedBoxTemplates}
                    closedBoxIsClosed={closedBoxIsClosed}
                    closedBox={closedBox}
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ pollerEnabled: any; stationHostType: any; ... Remove this comment to see the full error message
                    pollerEnabled={pollerEnabled}
                    stationId={stationId}
                />
                <StationHostStatus
                    pollerEnabled={pollerEnabled}
                    stationHostType={stationHostType}
                    stationId={stationId}
                />
            </div>
        </header>
    ) : <header className={stationHeaderContainer} />;
};

export default StationHeader;
