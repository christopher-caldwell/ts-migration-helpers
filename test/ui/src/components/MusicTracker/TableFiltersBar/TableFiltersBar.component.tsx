import React from 'react';

import SearchArtistsSongs from '../SearchArtistsSongs';
import CalendarButton from '../CalendarButton';
import ArrowWeekPicker from '../ArrowWeekPicker/ArrowWeekPicker.component';
import {
    tableFiltersBarContainer,
    musicTrackerCalendarFilter,
    musicTrackerFilterActions,
    calendarButton,
    arrowWeekPicker,
    musicTrackerFilter,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TableFiltersBar.module.scss'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TableFiltersBar.module.scss'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TableFiltersBar.module.scss'... Remove this comment to see the full error message
} from './TableFiltersBar.module.scss';

const TableFiltersBar = ({ setSongOrder, currentWeek, startDate, endDate }) => (
    <div className={tableFiltersBarContainer}>
        <div className={musicTrackerFilter}>
            <div className={musicTrackerCalendarFilter}>
                <div className={calendarButton}>
                    <CalendarButton currentWeek={currentWeek} startDate={startDate} />
                </div>
                <div className={arrowWeekPicker}>
                    <ArrowWeekPicker currentWeek={currentWeek} startDate={startDate} endDate={endDate} />
                </div>
            </div>
        </div>

        <div className={musicTrackerFilterActions}>
            <SearchArtistsSongs setSongOrder={setSongOrder} />
        </div>
    </div>
);

export default TableFiltersBar;
