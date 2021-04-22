import React from 'react';

import SongInfo from '../SongInfo';
import Callout from '../Callout';

import { columnGroupsContainer } from './ColumnGroups.module.css';

const ColumnGroups = ({ prefs, songOrder, startDate, endDate, stationId }) => {
    const readyColumnGroups = {
        songInfo: <SongInfo key="songInfo" songOrder={songOrder} />,
        callout: (
            <Callout
                key="callout"
                songOrder={songOrder}
                startDate={startDate}
                endDate={endDate}
                stationId={stationId}
            />
        ),
    };

    return <div className={columnGroupsContainer}>{prefs.map((groupKey) => readyColumnGroups[groupKey])}</div>;
};

export default ColumnGroups;
