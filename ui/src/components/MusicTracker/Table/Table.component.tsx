import React, { useState, useEffect } from 'react';
import moment from 'moment';

import TableFiltersBar from '../TableFiltersBar';
import ColumnGroups from '../ColumnGroups';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Table.module.css' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Table.module.css' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Table.module.css' or its cor... Remove this comment to see the full error message
import { tableContainer } from './Table.module.css';

const Table = ({ getSongMetadata, musicTrackerList = [], preferenceColGroups, stationId, setTablePreferences }) => {
    const [songOrder, setSongOrder] = useState(musicTrackerList);

    // setting start & end dates for previous week for Music Tracker
    const initialStartDate = moment().utc().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'startOfWeek' implicitly has an 'any' ty... Remove this comment to see the full error message
    const initialEndDate = moment().utc().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'startOfWeek' implicitly has an 'any' ty... Remove this comment to see the full error message
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    // updates the week selected by the user
    const setCurrentWeek = (startOfWeek, endOfWeek) => {
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    };

    useEffect(() => {
        getSongMetadata(stationId, startDate, endDate);
    }, [getSongMetadata, stationId, startDate, endDate]);

    useEffect(() => {
        if (!preferenceColGroups.length) setTablePreferences();
    }, [preferenceColGroups, setTablePreferences]);

    useEffect(() => {
        if (musicTrackerList.length && !songOrder.length) {
            setSongOrder(musicTrackerList);
        }
    }, [musicTrackerList, songOrder]);

    return (
        <div className={tableContainer}>
            <TableFiltersBar
                setSongOrder={setSongOrder}
                currentWeek={setCurrentWeek}
                startDate={startDate}
                endDate={endDate}
            />
            <ColumnGroups
                songOrder={songOrder}
                prefs={preferenceColGroups}
                stationId={stationId}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
};

export default Table;
