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
