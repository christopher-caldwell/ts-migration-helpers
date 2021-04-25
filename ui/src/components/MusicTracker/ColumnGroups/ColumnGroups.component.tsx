import React from 'react';

import SongInfo from '../SongInfo';
import Callout from '../Callout';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnGroups.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ColumnGroups.module.css' or ... Remove this comment to see the full error message
import { columnGroupsContainer } from './ColumnGroups.module.css';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'prefs' implicitly has an 'any' ty... Remove this comment to see the full error message
const ColumnGroups = ({ prefs, songOrder, startDate, endDate, stationId }) => {
    const readyColumnGroups = {
        songInfo: <SongInfo key="songInfo" songOrder={songOrder} />,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupKey' implicitly has an 'any' type.
        callout: (
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            <Callout
                key="callout"
                songOrder={songOrder}
                startDate={startDate}
                endDate={endDate}
                stationId={stationId}
            />
        ),
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupKey' implicitly has an 'any' type.
    return <div className={columnGroupsContainer}>{prefs.map(groupKey => readyColumnGroups[groupKey])}</div>;
};

export default ColumnGroups;
