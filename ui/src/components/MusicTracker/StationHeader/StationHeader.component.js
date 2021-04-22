import React, { useState, useEffect } from 'react';

import request from 'utils/request';

import StationInfo from '../StationInfo/StationInfo.component';
import SyncStatus from '../SyncStatus/SyncStatus.component';
import StationHostStatus from '../StationHostStatus/StationHostStatus.component';
import { stationHeaderContainer, stationInfo, radioTitle } from './StationHeader.module.css';

const StationHeader = ({
    stationId,
    hostInfo: { pollerEnabled, stationHostType },
    getHostInformationAction,
    getBoxAction,
    closedBox,
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

    useEffect(() => {
        getBoxAction(stationId);
    }, [getBoxAction, stationId]);

    useEffect(() => {
        const getStation = async () => {
            try {
                const newStation = await request(`/board/RadioBoard/${stationId}`);
                setStation(newStation);
            } catch (error) {
                console.error(error);
            }
        }
        if (!station) getStation();
    }, [stationId, station]);

    return station ? (
        <header className={stationHeaderContainer}>
            <div className={radioTitle}>
                <StationInfo station={station} lookupTables={lookupTables} />
            </div>
            <div className={stationInfo}>
                <SyncStatus
                    lengthOfstagedDaypartsArray={lengthOfstagedDaypartsArray}
                    lengthOfstagedRestrictionsArray={lengthOfstagedRestrictionsArray}
                    lengthOfStagedSongsArray={lengthOfStagedSongsArray}
                    closedBoxTemplates={closedBoxTemplates}
                    closedBoxIsClosed={closedBoxIsClosed}
                    closedBox={closedBox}
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
