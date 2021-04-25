import React from 'react';

import StationHeader from './StationHeader';
import Table from './Table';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MusicTracker.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MusicTracker.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MusicTracker.module.css' or ... Remove this comment to see the full error message
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
