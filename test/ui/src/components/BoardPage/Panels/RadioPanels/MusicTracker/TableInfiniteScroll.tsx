/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import lodashFilter from 'lodash/filter';
// @ts-expect-error ts-migrate(6133) FIXME: 'uniqBy' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'uniqBy' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'uniqBy' is declared but its value is never read.
import findIndex from 'lodash/findIndex';
import uniqBy from 'lodash/uniqBy';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import { Table as FixedTable, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import shortid from 'shortid';

import getBrowserHeight from 'utils/BrowserFunctions';
import makeColumnMap from 'components/BoardPage/Panels/RadioPanels/MusicTracker/makeColumnMap';
import HeaderButton from 'components/BoardPage/Panels/RadioPanels/MusicTracker/HeaderButton';
import MTUtils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import {
    updateCompareOptions,
    resetMusicTrackerFilter,
    removeReadOnlyCategories,
} from 'stores/musicTracker/musicTrackerActions';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { SIDERAIL_ACTION } from 'stores/actionTypes';
import SongBreakout from 'components/SongBreakout';

import {
    getArrowSort,
    getSortedCategory,
    getSortedRecommendedCategory,
    getSortedStagedCategory,
    defaultMTSort,
    getSortedCRG,
    separateAndReverseMTData,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    dateSort,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldDetailOpened' does not exist on type ... Remove this comment to see the full error message
    getNameSort,
    competitorSort,
// @ts-expect-error ts-migrate(2339) FIXME: Property 'oldBottomInfoOpened' does not exist on t... Remove this comment to see the full error message
} from 'utils/SortFunctions';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
const HEIGHT_HEADER_PAGE = 155;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
const HEIGHT_HEADER_TABLE = 56;
const DETAILS_OPENED_HEIGHT = 115;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetMusicTrackerFilterAction' does not ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
class TableInfiniteScroll extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'TableInfinit... Remove this comment to see the full error message
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldBottomInfoOpened' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldDetailOpened' does not exist on type ... Remove this comment to see the full error message
        super(props);

        this.state = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldBottomInfoOpened' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'openSongInfo' does not exist on type 'Re... Remove this comment to see the full error message
            tableHeight: 0,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
            calloutCore: false,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
            calloutTotal: false,
            omtCore: false,
            omtTotal: false,
            sortKey: undefined,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            sortAsc: undefined,
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetMusicTrackerFilterAction' does not ... Remove this comment to see the full error message
        this.rowHeight = 40;
        this.id = shortid.generate();
        this.oldDetailOpened = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
        this.oldBottomInfoOpened = null;
        this.localSongs = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
        this.firstTimeMount = null;
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
    componentDidMount() {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'minWidth' implicitly has an 'any'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldDetailOpened' does not exist on type ... Remove this comment to see the full error message
        this.updateHeightTable(); // TODO: remove all this and fix with CSS
        this.props.resetMusicTrackerFilterAction();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldBottomInfoOpened' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'rawStationCategories' does not exist on ... Remove this comment to see the full error message
        window.addEventListener('resize', this.updateHeightTable);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldBottomInfoOpened' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        this.firstTimeMount = true;
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    componentDidUpdate() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        const { detailOpened, bottomBarOpened } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openSongInfo' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
        if (this.oldDetailOpened !== detailOpened) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            this.oldDetailOpened = detailOpened;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
            this.updateHeightTable();
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
        if (this.oldBottomInfoOpened !== bottomBarOpened) {
            this.oldBottomInfoOpened = bottomBarOpened;
            this.updateHeightTable();
        }
    }

    componentWillUnmount() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
        window.removeEventListener('resize', this.updateHeightTable);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSongId' implicitly has an 'any' type... Remove this comment to see the full error message
        this.resetCompareOptions();
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
    onRowClick = (event, index) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sortKey' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { openSongInfo } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openSongInfo' does not exist on type 'Re... Remove this comment to see the full error message
        const song = this.localSongs[index];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
        openSongInfo(song, 'row');
    };

    resetCompareOptions = () => {
        this.props.updateCompareOptionsAction({
            selectedSongs: [],
            isCompareEnabled: false,
            sortOptionChanged: false,
        });
    };
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    onSortChange = columnKey => {
        const {
            musicTracker: {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                compare: { isCompareEnabled, selectedSongs },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            boardDetails: { filters },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
            updateCompareOptionsAction,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategories' does not exist on typ... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutCore' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeReadOnlyCategoriesFromFilterAction... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'omtCore' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sortKey' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
        const { sortKey, sortAsc } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupPreferences' implicitly has an 'an... Remove this comment to see the full error message
        const savedAscending = filters.applied.options.sort.ascending;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const initialSortAsc = sortAsc === undefined ? savedAscending : sortAsc;

        const newAsc = columnKey !== sortKey ? initialSortAsc : !initialSortAsc;

        this.setState({ sortKey: columnKey, sortAsc: newAsc });

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        if (isCompareEnabled) {
            // update the compare options
            updateCompareOptionsAction({
                selectedSongs,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
                isCompareEnabled,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'firstTimeMount' does not exist on type '... Remove this comment to see the full error message
                sortOptionChanged: true,
            });
        }
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
    getMinWidthRemaining = (group, { columns, minWidth }) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
        if (minWidth === undefined) return 0;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
        const usedWidth = group.columns.reduce((sum, key) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
            const width = columns[key] ? columns[key].width : 0;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
            return sum + width;
        }, 0);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versionsWithPacket' does not exist on ty... Remove this comment to see the full error message
        return minWidth - usedWidth;
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChangeIDs' does not exist on type 'Re... Remove this comment to see the full error message
    getStationDetails = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutCore' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSongId' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
            songs,
            musicTracker: {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
                filter,
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(a: any, b: any) => number | und... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'rawStationCategories' does not exist on ... Remove this comment to see the full error message
                compare: { isCompareEnabled, selectedSongs },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeReadOnlyCategoriesFromFilterAction... Remove this comment to see the full error message
            },
            rawStationCategories,
            stationCategoriesPermissions,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
            stationCategories,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            removeReadOnlyCategoriesFromFilterAction,
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ children?: React.ReactNode; is... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const songIndex = id => selectedSongs.findIndex(item => item === id);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        // get all songs from db, set checked for all songs that were selected by user
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
        const checkedSongs = songs.map(song => ({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            ...song,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
            checked: selectedSongs ? songIndex(song.sId) !== -1 : false,
        }));

        // filter the selected songs to compare
        let filteredSongs = isCompareEnabled ? checkedSongs.filter(song => song.checked) : songs;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
        filteredSongs = filteredSongs.filter(MTUtils.filterMusicTracker(filter));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        if (this.firstTimeMount) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            this.firstTimeMount = false;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            for (const category of Object.keys(stationCategories)) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentGroup' implicitly has an 'any' t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
                if (stationCategoriesPermissions[stationCategories[category]]) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
                    if (!filter.category.current.find(k => k.label === stationCategories[category])) {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
                        const auxFilter = { ...filter };
                        auxFilter.category.current.push(
                            rawStationCategories.find(k => k.label === stationCategories[category])
                        );
                        removeReadOnlyCategoriesFromFilterAction(auxFilter);
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutCore' does not exist on type 'Rea... Remove this comment to see the full error message
                    }
                }
            }
        }
        return {
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutTotal' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSongId' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'omtTotal' does not exist on type 'Readon... Remove this comment to see the full error message
            songs: filteredSongs,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
            isCompareEnabled,
            loading: songs.loading,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCompareOptionsAction' does not exi... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type 'Readonly<... Remove this comment to see the full error message
            count: filteredSongs.length,
        };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'breakoutSongInfo' does not exist on type... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongDetailClose' does not exist on typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
    selectSong = (newSongId, checked) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const {
            musicTracker: {
                compare: { isCompareEnabled, selectedSongs },
            },
            updateCompareOptionsAction,
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        const alreadySelected = selectedSongs.some(item => item === newSongId);
        if (checked && !alreadySelected) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // user checked song to compare
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            updateCompareOptionsAction({
                selectedSongs: [...selectedSongs, newSongId],
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
                isCompareEnabled,
                updateCompareOptions: false,
            });
        } else {
            // user unchecked song
            updateCompareOptionsAction({
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
                selectedSongs: selectedSongs.filter(songId => songId !== newSongId),
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
                isCompareEnabled,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
                updateCompareOptions: false,
            });
        }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    };

    updateHeightTable = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChangeIDs' does not exist on type 'Re... Remove this comment to see the full error message
        const browserHeight = this.defineHeightTable();
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutCore' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        document.querySelector('.root').style.setProperty('--table-height', `${browserHeight}px`);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        this.setState({ tableHeight: browserHeight });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
    };

    highlightSelectedRow = index => {
        const {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(a: any, b: any) => number | und... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            musicTracker: {
                compare: { isCompareEnabled },
            },
            categoryHighlight,
        } = this.props;
        if (this.localSongs[index]) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            const songChecked = this.localSongs[index].checked;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            const songId = this.localSongs[index].sId;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            const { data } = categoryHighlight;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            const mId = data.mediaId && data.mediaId.toString();
            const doesMediaIdMatch =
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ children?: React.ReactNode; is... Remove this comment to see the full error message
                data.songId === songId &&
                this.localSongs[index].category &&
                this.localSongs[index].category.staged &&
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'detailOpened' does not exist on type 'Re... Remove this comment to see the full error message
                this.localSongs[index].category.staged.find(item => item.media_id === mId);
            return classNames({
                'row-selected': songChecked && !isCompareEnabled,
                'song-selected': doesMediaIdMatch,
            });
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        return '';
    };

    defineHeightTable = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        const { detailOpened, bottomBarOpened } = this.props;
        const detailsOpenedHeight = detailOpened ? DETAILS_OPENED_HEIGHT : 0;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutCore' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'preferences' implicitly has an 'a... Remove this comment to see the full error message
        const bottomBarHeight = bottomBarOpened ? 60 : 0;
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songCompetitor' implicitly has an... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCallout' imp... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'calloutTotal' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
        const modifiedHeight = [detailsOpenedHeight, bottomBarHeight, HEIGHT_HEADER_PAGE].reduce(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
            (sum, n) => sum + n,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'result' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'omtCore' does not exist on type 'Readonl... Remove this comment to see the full error message
            0
        );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'omtTotal' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        return Math.round(getBrowserHeight() - modifiedHeight);
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columns' implicitly has an 'any' type.
    toggleCalloutCore = () => this.setState({ calloutCore: !this.state.calloutCore });

    toggleCalloutTotal = () => this.setState({ calloutTotal: !this.state.calloutTotal });

    toggleOmtCore = () => this.setState({ omtCore: !this.state.omtCore });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentGroup' implicitly has an 'any' t... Remove this comment to see the full error message
    toggleOmtTotal = () => this.setState({ omtTotal: !this.state.omtTotal });

    buildColumnHeaderAdditionalProps(columns, columnKey, groupPreferences) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
        let additionalColumnHeaders = {};
        const column = columns[columnKey];
        if (Object.prototype.hasOwnProperty.call(column, 'expanded')) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'spinsObj' implicitly has an 'any' type.
            // column is expandable
            const expandableColumnsInGroup = lodashFilter(columns, (currentColumn, currentColumnKey) => {
                const columnPreferences = groupPreferences.items.find(
                    currentItem => currentItem.sortKey === currentColumnKey
                );
                return (
                    currentColumn.expandGroup === column.expandGroup &&
                    get(columnPreferences, 'checked', false) === true
                );
            });
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
            // Only the last column of the group will display the expand button
            const lastColumnInGroup = expandableColumnsInGroup[expandableColumnsInGroup.length - 1];
            const isLastColumnInGroup = lastColumnInGroup.header === column.header;
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
            if (isLastColumnInGroup) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnOrder' implicitly has an 'any' ty... Remove this comment to see the full error message
                additionalColumnHeaders = {
                    ...additionalColumnHeaders,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
                    clickExpand: typeof column.clickExpand !== 'undefined' ? column.clickExpand : false,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'versionsWithPacket' does not exist on ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type 'Readonly<... Remove this comment to see the full error message
                    expanded: typeof column.expanded !== 'undefined' ? column.expanded : false,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type 'Readonly<... Remove this comment to see the full error message
                };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'breakoutSongInfo' does not exist on type... Remove this comment to see the full error message
            }
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongDetailClose' does not exist on typ... Remove this comment to see the full error message
        return additionalColumnHeaders;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
    }

    renderColumnGroups = (songs, columnOrder) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tableHeight' does not exist on type 'Rea... Remove this comment to see the full error message
        const {
            boardDetails: {
                filters,
                layout: {
                    board: { cmmFormat },
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                },
            },
            musicTracker: {
                compare: { isCompareEnabled, selectedSongs },
            },
            competitors,
            preferences: { musictracker },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            versionsWithPacket,
            catChangeIDs,
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const { calloutCore, calloutTotal, omtCore, omtTotal, sortKey, sortAsc } = this.state;

        const { key: savedSortKey, ascending: savedAscending } = filters.applied.options.sort;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(a: any, b: any) => number | und... Remove this comment to see the full error message
        const key = sortKey || savedSortKey;

        const ascending = sortAsc === undefined ? savedAscending : sortAsc;

        let data = [...songs];

        if (key.includes('enhanced.plus')) {
            const arrowSortKey = key.split('.')[1];
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
            data.sort((a, b) => getArrowSort(arrowSortKey, a.metrics.enhanced, b.metrics.enhanced));
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        } else if (key === 'aNm' || key === 'sNm') {
            data.sort((a, b) => getNameSort(key, a.metadata, b.metadata));
        } else if (key.includes('category.current') || key.includes('category.prior')) {
            data.sort((a, b) => getSortedCategory(key, a, b));
        } else if (key.includes('category.recommended')) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            data.sort((a, b) => getSortedRecommendedCategory(a, b));
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        } else if (key.includes('category.staged')) {
            data.sort((a, b) => getSortedStagedCategory(key, a, b, catChangeIDs));
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        } else if (key === 'crg') {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            data.sort((a, b) => getSortedCRG(a.metrics, b.metrics));
        } else if (key.includes('Dt')) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            data.sort((a, b) => dateSort(key, a.metrics, b.metrics));
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        } else if (key.includes('competitor')) {
            data.sort((a, b) => {
                const datumA = get(a, key);
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                const datumB = get(b, key);
                return competitorSort(datumA, datumB);
            });
        } else {
            // sorting numbers other than rank numbers
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            data.sort((a, b) => defaultMTSort(key, a.metrics, b.metrics));
        }

        data = separateAndReverseMTData(data, key, ascending, catChangeIDs);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // ^ handles keeping null data at bottom of table and/or reversing sort order

        const columnMap = makeColumnMap({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            isCompareEnabled,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
            data,
            filters,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            toggleCalloutCore: this.toggleCalloutCore,
            calloutCore,
            toggleCalloutTotal: this.toggleCalloutTotal,
            calloutTotal,
            toggleOmtCore: this.toggleOmtCore,
            omtCore,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            toggleOmtTotal: this.toggleOmtTotal,
            omtTotal,
            competitors,
            selectSong: this.selectSong,
            selectedSongs,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
            cmmFormat,
            versionsWithPacket,
            ...this.props,
        });

        this.localSongs = data;

        return columnOrder.map(group => {
            if (group.key === 'enhanced' && !filters.applied.options.hasTAA) return null;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'col' implicitly has an 'any' type.
            // ^ this hides the taa columns if user doesn't have permissions to it.
            const groupSpec = columnMap[group.key];
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
            const minWidthRemaining = this.getMinWidthRemaining(group, groupSpec);
            const cellWidths = group.columns.reduce((sum, colKey) => {
                const width = get(groupSpec.columns, [colKey, 'width'], 50);

                return sum + width;
            }, 0);
            const { noGroup } = group;

            const columns = group.columns
                .filter(col => {
                    const column = groupSpec.columns[col];
                    return !isEmpty(column);
                })
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentGroup' implicitly has an 'any' t... Remove this comment to see the full error message
                .map((columnKey, index) => {
                    const column = groupSpec.columns[columnKey];
                    const cellClass = classNames(
                        typeof column.cell.props.className !== 'undefined' ? column.cell.props.className : '',
                        {
                            'fixed-data-table-cell-border':
                                index === 0 && columnKey !== 'checked' && columnKey !== 'category.prior',
                        }
                    );
                    const cell = React.cloneElement(column.cell, {
                        className: cellClass,
                    });
                    const groupPreferences = musictracker.find(currentGroup => currentGroup.key === group.key);
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    const columnHeaderAdditionalProps = this.buildColumnHeaderAdditionalProps(
                        groupSpec.columns,
                        columnKey,
                        groupPreferences
                    );
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                    const header = (
                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'preferences' implicitly has an 'a... Remove this comment to see the full error message
                        <Cell className={cellClass}>
                            {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songCompetitor' implicitly has an... Remove this comment to see the full error message */}
                            <HeaderButton
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmOmt' implicitly has an 'any' t... Remove this comment to see the full error message
                                column={column}
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCallout' imp... Remove this comment to see the full error message
                                columnKey={columnKey}
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedOmt' implici... Remove this comment to see the full error message
                                sort={{ key, ascending }}
                                onClick={this.onSortChange}
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type 'Readonly<... Remove this comment to see the full error message
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'result' implicitly has an 'any' type.
                                className={typeof column.className !== 'undefined' ? column.className : ''}
                                {...columnHeaderAdditionalProps}
                            />
                        </Cell>
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                    );
                    const widthRatio = groupSpec.minWidth > 0 ? column.width / cellWidths : 0;
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                    const extraWidth = minWidthRemaining > 0 ? widthRatio * minWidthRemaining : 0;

                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                    return (
                        <Column
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                            allowCellsRecyclying
                            pureRendering
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'localSongs' does not exist on type 'Tabl... Remove this comment to see the full error message
                            key={columnKey}
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                            cell={cell}
                            columnKey={column.key || columnKey}
                            fixed={group.fixed}
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'spinsObj' implicitly has an 'any' type.
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
                            header={header}
                            width={column.width + (Number.isNaN(extraWidth) ? 0 : extraWidth)}
                            flexGrow={column.flexGrow}
                        />
                    );
                });
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'Table... Remove this comment to see the full error message
            const header = !isUndefined(groupSpec.render) ? groupSpec.render() : groupSpec.name;
            return noGroup ? (
                columns
            ) : (
                <ColumnGroup key={group.key} fixed={group.fixed} header={header}>
                    {columns}
                </ColumnGroup>
            );
        });
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const {
            order,
            width,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            breakoutSongInfo,
            onSongDetailClose,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            categoryHighlight: { data },
        } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { tableHeight } = this.state;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { songs } = this.getStationDetails();
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const positionInTable = findIndex(this.localSongs, { sId: data.songId });
        let doesMediaIdMatch = false;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        if (positionInTable !== -1) {
            const mId = data.mediaId && data.mediaId.toString();
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            doesMediaIdMatch =
                this.localSongs[positionInTable].category &&
                this.localSongs[positionInTable].category.staged &&
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                this.localSongs[positionInTable].category.staged.find(item => item.media_id === mId);
        }
        const scrollToRow =
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            data.source === SIDERAIL_ACTION && doesMediaIdMatch ? positionInTable * this.rowHeight : null;

        return (
            <div className="table-container">
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                <FixedTable
                    touchScrollEnabled
                    rowClassNameGetter={this.highlightSelectedRow}
                    onRowClick={this.onRowClick}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
                    groupHeaderHeight={35}
                    headerHeight={60}
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    rowsCount={songs.length}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                    rowHeight={this.rowHeight}
                    width={width}
                    height={tableHeight - HEIGHT_HEADER_TABLE}
                    scrollTop={scrollToRow}
                >
                    {this.renderColumnGroups(songs, order)}
                </FixedTable>
                {breakoutSongInfo ? (
                    <SongBreakout breakoutSongInfo={breakoutSongInfo} onClose={onSongDetailClose} />
                ) : null}
            </div>
        );
    }
}

TableInfiniteScroll.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    bottomBarOpened: PropTypes.bool.isRequired,
    categoryHighlight: PropTypes.shape().isRequired,
    competitors: PropTypes.shape().isRequired,
    musicTracker: PropTypes.shape().isRequired,
    openSongInfo: PropTypes.func.isRequired,
    order: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    preferences: PropTypes.shape().isRequired,
    resetMusicTrackerFilterAction: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    updateCompareOptionsAction: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    onSongDetailClose: PropTypes.func.isRequired,
    breakoutSongInfo: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
    catChangeIDs: PropTypes.arrayOf(PropTypes.object),
    detailOpened: PropTypes.bool,
    songInfoSelected: PropTypes.shape(),
    versionsWithPacket: PropTypes.arrayOf(PropTypes.string),
};

TableInfiniteScroll.defaultProps = {
    catChangeIDs: [],
    detailOpened: false,
    breakoutSongInfo: false,
    songInfoSelected: { sId: 0 },
    versionsWithPacket: null,
};

const mergeCmmData = (songId, cmmData) => {
    const songCmm = Object.values(cmmData).find(song => song.songId === songId);
    const getColumnValue = column => get(songCmm, column, null);
    return {
        pop: {
            cRnk: getColumnValue('popCoreRank'),
            score: getColumnValue('popCore'),
            tRnk: getColumnValue('popTotalRank'),
            quintileTotalGroup: getColumnValue('quintileTotalGroup') || 6,
            quintileCoreGroup: getColumnValue('quintileCoreGroup') || 6,
            total: getColumnValue('popTotal'),
            tPeakScore: getColumnValue('popTotalPeak'),
            tPeakDt: getColumnValue('popTotalPeakDate'),
            aa: getColumnValue('popAa'),
            hisp: getColumnValue('popHispanic'),
            aahisp: getColumnValue('popAaHisp'),
            white: getColumnValue('popWhite'),
            asian: getColumnValue('popAsian'),
            male: getColumnValue('popMale'),
            female: getColumnValue('popFemale'),
            young: getColumnValue('popYoung'),
            old: getColumnValue('popOld'),
            consolidated1TotalRank: getColumnValue('popTotalConsolidated1Rank'),
            consolidated1Total: getColumnValue('popTotalConsolidated1'),
            consolidated2TotalRank: getColumnValue('popTotalConsolidated2Rank'),
            consolidated2Total: getColumnValue('popTotalConsolidated2'),
            consolidated3TotalRank: getColumnValue('popTotalConsolidated3Rank'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            consolidated3Total: getColumnValue('popTotalConsolidated3'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoryHighlight' implicitly has... Remove this comment to see the full error message
            metricKey: 'pop.score',
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmOmt' implicitly has an 'any' t... Remove this comment to see the full error message
        },
        '2pop': {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedCallout' imp... Remove this comment to see the full error message
            score: getColumnValue('twoPopCore'),
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmCustomConsolidatedOmt' implici... Remove this comment to see the full error message
            total: getColumnValue('twoPopTotal'),
            hisp: getColumnValue('twoPopHispanic'),
            white: getColumnValue('twoPopWhite'),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'items' implicitly has an 'any' type.
            asian: getColumnValue('twoPopAsian'),
            aa: getColumnValue('twoPopAa'),
            aahisp: getColumnValue('twoPopAaHisp'),
            male: getColumnValue('twoPopMale'),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'result' implicitly has an 'any' type.
            female: getColumnValue('twoPopFemale'),
            young: getColumnValue('twoPopYoung'),
            old: getColumnValue('twoPopOld'),
        },
        ptl: {
            score: getColumnValue('ptlCore'),
            total: getColumnValue('ptlTotal'),
            hisp: getColumnValue('ptlHispanic'),
            white: getColumnValue('ptlWhite'),
            asian: getColumnValue('ptlAsian'),
            aa: getColumnValue('ptlAa'),
            aahisp: getColumnValue('ptlAaHisp'),
            male: getColumnValue('ptlMale'),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            female: getColumnValue('ptlFemale'),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
            young: getColumnValue('ptlYoung'),
            old: getColumnValue('ptlOld'),
        },
        unf: { score: getColumnValue('unfCore'), total: getColumnValue('unfTotal') },
        neg: { score: getColumnValue('negCore'), total: getColumnValue('negTotal') },
        ddl: { score: getColumnValue('ddlCore'), total: getColumnValue('ddlTotal') },
        nop: { score: getColumnValue('nopCore'), total: getColumnValue('nopTotal') },
        lik: { score: getColumnValue('likCore'), total: getColumnValue('likTotal') },
        fav: { score: getColumnValue('favCore'), total: getColumnValue('favTotal') },
    };
};

const mapStateToProps = ({
    boardDetails,
    musicTracker,
    preferences,
    user,
    songs,
    songVersions,
    songCompetitor,
    categoryHighlight,
    cmmOmt: { data: cmmOmt },
    cmmCustomConsolidatedCallout: { data: cmmCustomConsolidatedCallout },
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'spinsObj' implicitly has an 'any' type.
    cmmCustomConsolidatedOmt: { data: cmmCustomConsolidatedOmt },
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
}) => {
    const spins = ((songCompetitor.data || {}).competitor_song_spins || []).map(items => ({
        key: Object.keys(items)[0],
        val: Object.values(items)[0],
    }));
    const { staged, current, prior, recommended, config } = songVersions.data;

    const mergedSongData = songs.data.reduce((result, song) => {
        const stagedVersion = (staged && staged[song.sId]) || [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
        const currentVersion = (current && current[song.sId]) || [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'comp' implicitly has an 'any' type.
        const priorVersion = (prior && prior[song.sId]) || [];
        const recommendedVersion = (recommended && recommended[song.sId]) || null;

        const merged = MTUtils.mergeAndReOrder('media_id', stagedVersion, currentVersion);

        if (isEmpty(merged)) merged.push(null);

        return [
            ...result,
            ...merged.map(item => {
                const byMediaId = i => item && i.media_id === item.media_id;

                const findCurrentVersion = currentVersion.find(byMediaId);
                const findPriorVersion = priorVersion.find(byMediaId);

                return {
                    ...song,
                    metrics: {
                        ...song.metrics,
                        omt: mergeCmmData(song.sId, cmmOmt),
                        customCallout: mergeCmmData(song.sId, cmmCustomConsolidatedCallout),
                        customOmt: mergeCmmData(song.sId, cmmCustomConsolidatedOmt),
                    },
                    category: {
                        current: item && (findCurrentVersion ? [findCurrentVersion] : []),
                        prior: item && (findPriorVersion ? [findPriorVersion] : []),
                        staged: item && [item],
                        recommended: recommendedVersion,
                    },
                    spins: spins.reduce(
                        (spinsObj, entry) => ({
                            ...spinsObj,
                            [entry.key]: entry.val.spins[song.sId],
                        }),
                        {}
                    ),
                };
            }),
        ];
    }, []);

    mergedSongData.lastCategoriesUpdatedDate = config && config.last_categories_updated_date;

    return {
        boardDetails,
        musicTracker,
        preferences,
        user,
        songs: mergedSongData,
        competitors: spins.reduce(
            (competitors, comp) => ({
                ...competitors,
                [comp.key]: comp.val.call_letter,
            }),
            {}
        ),
        categoryHighlight,
    };
};

const mapDispatchToProps = {
    updateCompareOptionsAction: updateCompareOptions,
    resetMusicTrackerFilterAction: resetMusicTrackerFilter,
    removeReadOnlyCategoriesFromFilterAction: removeReadOnlyCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableInfiniteScroll);
