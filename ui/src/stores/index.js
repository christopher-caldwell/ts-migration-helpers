import { combineReducers } from 'redux';

import boardDetails from './boardDetails/boardDetailsReducer';
import dayparts from './dayparts/daypartsReducer';
import userBoardReducer from './userBoard/userBoardReducer';
import recategorizationReasons from './recategorizationReasons/recategorizationReasonsReducer';
import musicTrackerOverlay from './musicTrackerOverlay/musicTrackerOverlayReducer';
import categorySidebar from './categorySidebar/categorySidebarReducer';
import categoryHighlight from './categoryHighlight/categoryHighlightReducer';
import songTrends from './songTrends/songTrendsReducer';
import packets from './packets/packetsReducer';
import restrictions from './restrictions/restrictionsReducer';
import box from './box/boxReducer';
import breakout from './breakout/breakoutReducer';
import breakoutPreferences from './breakoutPreferences/breakoutPreferencesReducer';
import dateIntegrity from './dateIntegrity/dateIntegrityReducer';
import features from './features/featuresReducer';
import lookupTables from './lookupTables/lookupTablesReducer';
import musicTracker from './musicTracker/musicTrackerReducer';
import musicTrackerData from './musicTrackerData/musicTrackerDataReducer';
import preferences from './preferences/preferencesReducer';
import radioBoardFilters from './radioBoardFilters/radioBoardFiltersReducer';
import similarStations from './similarStations/similarStationsReducer';
import songCompetitor from './songCompetitor/songCompetitorReducer';
import songs from './songs/songsReducer';
import songVersions from './songVersions/songVersionsReducer';
import user from './user/userReducer';
import hostInfo from './hostInformation/hostInformationReducer';
import recommendableCategories from './recommendableCategories/recommendableCategoriesReducer';
import stationInfo from './stationInfo/stationInfoReducer';
import newPreferences from './newPreferences/newPreferencesReducer';
import songMetadata from './songMetadata/songMetadataReducer';
import cmmCallout from './cmm/calloutReducer';
import cmmOmt from './cmm/omtReducer';
import cmmCustomConsolidatedCallout from './cmm/customConsolidatedCalloutReducer';
import cmmCustomConsolidatedOmt from './cmm/customConsolidatedOmtReducer';
import cmmCalloutTrends from './cmm/calloutTrendsReducer';
import cmmOmtTrends from './cmm/omtTrendsReducer';
import cmmCustomConsolidatedCalloutTrends from './cmm/customConsolidatedCalloutTrendsReducer';
import cmmCustomConsolidatedOmtTrends from './cmm/customConsolidatedOmtTrendsReducer';
import categoriesMetadata from './categories/categoriesMetadataReducer';
import stationCategories from './categories/stationCategoriesReducer';

const rootReducer = combineReducers({
    boardDetails,
    box,
    breakout,
    breakoutPreferences,
    categoriesMetadata,
    categoryHighlight,
    categorySidebar,
    cmmCallout,
    cmmCalloutTrends,
    cmmCustomConsolidatedCallout,
    cmmCustomConsolidatedCalloutTrends,
    cmmCustomConsolidatedOmt,
    cmmCustomConsolidatedOmtTrends,
    cmmOmt,
    cmmOmtTrends,
    dateIntegrity,
    dayparts,
    featureToggle: features,
    hostInfo,
    lookupTables,
    musicTracker,
    musicTrackerData,
    musicTrackerOverlay,
    newPreferences,
    packets,
    preferences,
    radioBoardFilters,
    recategorizationReasons,
    recommendableCategories,
    restrictions,
    similarStations,
    songCompetitor,
    songMetadata,
    songs,
    songTrends,
    songVersions,
    stationCategories,
    stationInfo,
    user,
    userBoardReducer,
    // sort alphabetically!
});

export default rootReducer;
