export const EMPTY_VALUE_PLACEHOLDER = '-';
export const CATEGORY_PATH = 'musictracker/category';
export const MUSICTRACKER_PATH = 'musictracker';
export const OVERVIEW_PATH = 'playlist-overview';
export const ARTIST_OVERVIEW_PATH = 'overview';
export const CHART_PATH = 'chart';
export const TOP_STATS_PATH = 'top-stats';
export const DAYPART_ARRAY = ['AMD', 'MID', 'PMD', 'EVE', 'OVN'];
export const DAYPART_WEEK_RANGE = [
    [0, 23],
    [24, 47],
    [48, 71],
    [72, 95],
    [96, 119],
    [120, 143],
    [144, 167],
];
export const RANGE_OF_HOURS = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
];
export const CANNOT_APPROVE_EMPTY_SLOTS = `Changes cannot be approved while there are empty slots.
    Please review and update any empty slots.`;

export const PERIODS = {
    daily: {
        lastPeriod: 'Last Day',
        thisPeriod: 'This Day',
        lastPeriodShort: 'LD',
        thisPeriodShort: 'TD',
    },
    weekly: {
        lastPeriod: 'Last Week',
        thisPeriod: 'This Week',
        lastPeriodShort: 'LW',
        thisPeriodShort: 'TW',
    },
    allTime: {
        lastPeriod: 'Last Period',
        thisPeriod: 'This Period',
        lastPeriodShort: 'LP',
        thisPeriodShort: 'TP',
    },
    custom: {
        lastPeriod: 'Last Period',
        thisPeriod: 'This Period',
        lastPeriodShort: 'LP',
        thisPeriodShort: 'TP',
    },
};
export const NONE_CATEGORY = 'None';
export const MISSING_CATEGORY = 'Out of sync';
export const FEATURES = {
    DAYPARTS: 'Dayparts',
    PACKET_SONG: 'PacketSong',
    CATEGORY_APPROVE: 'CategoryApprove',
    MUSIC_TRACKER_SEARCH: 'MusicTrackerSearch',
    STATION_CONFIGS: 'StationConfigs',
    HOUR_RESTRICTION: 'HourRestriction',
    ASSIGN_DAYPART: 'AssignDaypart',
    ALTERNATE_CATEGORY: 'AlternateCategory',
    NEW_TABLE: 'NewTable',
    CATEGORY_GOALS: 'CategoryGoals',
};
export const GSELECTOR_FEATURES = {
    ASSIGN_DAYPART: {
        title: 'Assign Daypart',
        featureName: FEATURES.ASSIGN_DAYPART,
    },
    PACKET_SONG: {
        title: 'Packet Song',
        featureName: FEATURES.PACKET_SONG,
    },
    HOUR_RESTRICTION: {
        title: 'Hour Restriction',
        featureName: FEATURES.HOUR_RESTRICTION,
    },
};

export const FEATURE_TITLE = {
    ASSIGN_DAYPART: 'Assign Daypart',
    ALTERNATE_CATEGORY: 'Alternate Category',
    PACKET_SONG: 'Packet Song',
    HOUR_RESTRICTION: 'Hour Restriction',
};
