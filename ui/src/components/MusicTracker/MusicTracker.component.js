import React from 'react';

import StationHeader from './StationHeader';
import Table from './Table';

import { musicTrackerContainer } from './MusicTracker.module.css';

const MusicTracker = ({
    match: {
        params: { boardId },
    },
}) => (
    <div className={musicTrackerContainer}>
        <StationHeader stationId={boardId} />
        <Table stationId={boardId} />
    </div>
);

export default MusicTracker;
