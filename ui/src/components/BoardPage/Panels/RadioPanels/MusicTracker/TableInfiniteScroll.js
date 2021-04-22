/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import lodashFilter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import uniqBy from 'lodash/uniqBy';
import { Table as FixedTable, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
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
    dateSort,
    getNameSort,
    competitorSort,
} from 'utils/SortFunctions';

const HEIGHT_HEADER_PAGE = 155;
const HEIGHT_HEADER_TABLE = 56;
const DETAILS_OPENED_HEIGHT = 115;

class TableInfiniteScroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHeight: 0,
            calloutCore: false,
            calloutTotal: false,
            omtCore: false,
            omtTotal: false,
            sortKey: undefined,
            sortAsc: undefined,
        };

        this.rowHeight = 40;
        this.id = shortid.generate();
        this.oldDetailOpened = null;
        this.oldBottomInfoOpened = null;
        this.localSongs = [];
        this.firstTimeMount = null;
    }

    componentDidMount() {
        this.updateHeightTable(); // TODO: remove all this and fix with CSS
        this.props.resetMusicTrackerFilterAction();
        window.addEventListener('resize', this.updateHeightTable);
        this.firstTimeMount = true;
    }

    componentDidUpdate() {
        const { detailOpened, bottomBarOpened } = this.props;
        if (this.oldDetailOpened !== detailOpened) {
            this.oldDetailOpened = detailOpened;
            this.updateHeightTable();
        }
        if (this.oldBottomInfoOpened !== bottomBarOpened) {
            this.oldBottomInfoOpened = bottomBarOpened;
            this.updateHeightTable();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeightTable);
        this.resetCompareOptions();
    }

    onRowClick = (event, index) => {
        const { openSongInfo } = this.props;
        const song = this.localSongs[index];
        openSongInfo(song, 'row');
    };

    resetCompareOptions = () => {
        this.props.updateCompareOptionsAction({
            selectedSongs: [],
            isCompareEnabled: false,
            sortOptionChanged: false,
        });
    };

    onSortChange = columnKey => {
        const {
            musicTracker: {
                compare: { isCompareEnabled, selectedSongs },
            },
            boardDetails: { filters },
            updateCompareOptionsAction,
        } = this.props;
        const { sortKey, sortAsc } = this.state;
        const savedAscending = filters.applied.options.sort.ascending;
        const initialSortAsc = sortAsc === undefined ? savedAscending : sortAsc;

        const newAsc = columnKey !== sortKey ? initialSortAsc : !initialSortAsc;

        this.setState({ sortKey: columnKey, sortAsc: newAsc });

        if (isCompareEnabled) {
            // update the compare options
            updateCompareOptionsAction({
                selectedSongs,
                isCompareEnabled,
                sortOptionChanged: true,
            });
        }
    };

    getMinWidthRemaining = (group, { columns, minWidth }) => {
        if (minWidth === undefined) return 0;

        const usedWidth = group.columns.reduce((sum, key) => {
            const width = columns[key] ? columns[key].width : 0;
            return sum + width;
        }, 0);

        return minWidth - usedWidth;
    };

    getStationDetails = () => {
        const {
            songs,
            musicTracker: {
                filter,
                compare: { isCompareEnabled, selectedSongs },
            },
            rawStationCategories,
            stationCategoriesPermissions,
            stationCategories,
            removeReadOnlyCategoriesFromFilterAction,
        } = this.props;

        const songIndex = id => selectedSongs.findIndex(item => item === id);

        // get all songs from db, set checked for all songs that were selected by user
        const checkedSongs = songs.map(song => ({
            ...song,
            checked: selectedSongs ? songIndex(song.sId) !== -1 : false,
        }));

        // filter the selected songs to compare
        let filteredSongs = isCompareEnabled ? checkedSongs.filter(song => song.checked) : songs;
        filteredSongs = filteredSongs.filter(MTUtils.filterMusicTracker(filter));
        if (this.firstTimeMount) {
            this.firstTimeMount = false;
            for (const category of Object.keys(stationCategories)) {
                if (stationCategoriesPermissions[stationCategories[category]]) {
                    if (!filter.category.current.find(k => k.label === stationCategories[category])) {
                        const auxFilter = { ...filter };
                        auxFilter.category.current.push(
                            rawStationCategories.find(k => k.label === stationCategories[category])
                        );
                        removeReadOnlyCategoriesFromFilterAction(auxFilter);
                    }
                }
            }
        }
        return {
            songs: filteredSongs,
            isCompareEnabled,
            loading: songs.loading,
            count: filteredSongs.length,
        };
    };

    selectSong = (newSongId, checked) => {
        const {
            musicTracker: {
                compare: { isCompareEnabled, selectedSongs },
            },
            updateCompareOptionsAction,
        } = this.props;
        const alreadySelected = selectedSongs.some(item => item === newSongId);
        if (checked && !alreadySelected) {
            // user checked song to compare
            updateCompareOptionsAction({
                selectedSongs: [...selectedSongs, newSongId],
                isCompareEnabled,
                updateCompareOptions: false,
            });
        } else {
            // user unchecked song
            updateCompareOptionsAction({
                selectedSongs: selectedSongs.filter(songId => songId !== newSongId),
                isCompareEnabled,
                updateCompareOptions: false,
            });
        }
    };

    updateHeightTable = () => {
        const browserHeight = this.defineHeightTable();
        document.querySelector('.root').style.setProperty('--table-height', `${browserHeight}px`);

        this.setState({ tableHeight: browserHeight });
    };

    highlightSelectedRow = index => {
        const {
            musicTracker: {
                compare: { isCompareEnabled },
            },
            categoryHighlight,
        } = this.props;
        if (this.localSongs[index]) {
            const songChecked = this.localSongs[index].checked;
            const songId = this.localSongs[index].sId;
            const { data } = categoryHighlight;
            const mId = data.mediaId && data.mediaId.toString();
            const doesMediaIdMatch =
                data.songId === songId &&
                this.localSongs[index].category &&
                this.localSongs[index].category.staged &&
                this.localSongs[index].category.staged.find(item => item.media_id === mId);
            return classNames({
                'row-selected': songChecked && !isCompareEnabled,
                'song-selected': doesMediaIdMatch,
            });
        }
        return '';
    };

    defineHeightTable = () => {
        const { detailOpened, bottomBarOpened } = this.props;
        const detailsOpenedHeight = detailOpened ? DETAILS_OPENED_HEIGHT : 0;
        const bottomBarHeight = bottomBarOpened ? 60 : 0;
        const modifiedHeight = [detailsOpenedHeight, bottomBarHeight, HEIGHT_HEADER_PAGE].reduce(
            (sum, n) => sum + n,
            0
        );

        return Math.round(getBrowserHeight() - modifiedHeight);
    };

    toggleCalloutCore = () => this.setState({ calloutCore: !this.state.calloutCore });

    toggleCalloutTotal = () => this.setState({ calloutTotal: !this.state.calloutTotal });

    toggleOmtCore = () => this.setState({ omtCore: !this.state.omtCore });

    toggleOmtTotal = () => this.setState({ omtTotal: !this.state.omtTotal });

    buildColumnHeaderAdditionalProps(columns, columnKey, groupPreferences) {
        let additionalColumnHeaders = {};
        const column = columns[columnKey];
        if (Object.prototype.hasOwnProperty.call(column, 'expanded')) {
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
            // Only the last column of the group will display the expand button
            const lastColumnInGroup = expandableColumnsInGroup[expandableColumnsInGroup.length - 1];
            const isLastColumnInGroup = lastColumnInGroup.header === column.header;
            if (isLastColumnInGroup) {
                additionalColumnHeaders = {
                    ...additionalColumnHeaders,
                    clickExpand: typeof column.clickExpand !== 'undefined' ? column.clickExpand : false,
                    expanded: typeof column.expanded !== 'undefined' ? column.expanded : false,
                };
            }
        }
        return additionalColumnHeaders;
    }

    renderColumnGroups = (songs, columnOrder) => {
        const {
            boardDetails: {
                filters,
                layout: {
                    board: { cmmFormat },
                },
            },
            musicTracker: {
                compare: { isCompareEnabled, selectedSongs },
            },
            competitors,
            preferences: { musictracker },
            versionsWithPacket,
            catChangeIDs,
        } = this.props;
        const { calloutCore, calloutTotal, omtCore, omtTotal, sortKey, sortAsc } = this.state;

        const { key: savedSortKey, ascending: savedAscending } = filters.applied.options.sort;

        const key = sortKey || savedSortKey;

        const ascending = sortAsc === undefined ? savedAscending : sortAsc;

        let data = [...songs];

        if (key.includes('enhanced.plus')) {
            const arrowSortKey = key.split('.')[1];
            data.sort((a, b) => getArrowSort(arrowSortKey, a.metrics.enhanced, b.metrics.enhanced));
        } else if (key === 'aNm' || key === 'sNm') {
            data.sort((a, b) => getNameSort(key, a.metadata, b.metadata));
        } else if (key.includes('category.current') || key.includes('category.prior')) {
            data.sort((a, b) => getSortedCategory(key, a, b));
        } else if (key.includes('category.recommended')) {
            data.sort((a, b) => getSortedRecommendedCategory(a, b));
        } else if (key.includes('category.staged')) {
            data.sort((a, b) => getSortedStagedCategory(key, a, b, catChangeIDs));
        } else if (key === 'crg') {
            data.sort((a, b) => getSortedCRG(a.metrics, b.metrics));
        } else if (key.includes('Dt')) {
            data.sort((a, b) => dateSort(key, a.metrics, b.metrics));
        } else if (key.includes('competitor')) {
            data.sort((a, b) => {
                const datumA = get(a, key);
                const datumB = get(b, key);
                return competitorSort(datumA, datumB);
            });
        } else {
            // sorting numbers other than rank numbers
            data.sort((a, b) => defaultMTSort(key, a.metrics, b.metrics));
        }

        data = separateAndReverseMTData(data, key, ascending, catChangeIDs);
        // ^ handles keeping null data at bottom of table and/or reversing sort order

        const columnMap = makeColumnMap({
            isCompareEnabled,
            data,
            filters,
            toggleCalloutCore: this.toggleCalloutCore,
            calloutCore,
            toggleCalloutTotal: this.toggleCalloutTotal,
            calloutTotal,
            toggleOmtCore: this.toggleOmtCore,
            omtCore,
            toggleOmtTotal: this.toggleOmtTotal,
            omtTotal,
            competitors,
            selectSong: this.selectSong,
            selectedSongs,
            cmmFormat,
            versionsWithPacket,
            ...this.props,
        });

        this.localSongs = data;

        return columnOrder.map(group => {
            if (group.key === 'enhanced' && !filters.applied.options.hasTAA) return null;
            // ^ this hides the taa columns if user doesn't have permissions to it.
            const groupSpec = columnMap[group.key];
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
                    const columnHeaderAdditionalProps = this.buildColumnHeaderAdditionalProps(
                        groupSpec.columns,
                        columnKey,
                        groupPreferences
                    );
                    const header = (
                        <Cell className={cellClass}>
                            <HeaderButton
                                column={column}
                                columnKey={columnKey}
                                sort={{ key, ascending }}
                                onClick={this.onSortChange}
                                className={typeof column.className !== 'undefined' ? column.className : ''}
                                {...columnHeaderAdditionalProps}
                            />
                        </Cell>
                    );
                    const widthRatio = groupSpec.minWidth > 0 ? column.width / cellWidths : 0;
                    const extraWidth = minWidthRemaining > 0 ? widthRatio * minWidthRemaining : 0;

                    return (
                        <Column
                            allowCellsRecyclying
                            pureRendering
                            key={columnKey}
                            cell={cell}
                            columnKey={column.key || columnKey}
                            fixed={group.fixed}
                            header={header}
                            width={column.width + (Number.isNaN(extraWidth) ? 0 : extraWidth)}
                            flexGrow={column.flexGrow}
                        />
                    );
                });
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
        const {
            order,
            width,
            breakoutSongInfo,
            onSongDetailClose,
            categoryHighlight: { data },
        } = this.props;
        const { tableHeight } = this.state;
        const { songs } = this.getStationDetails();
        const positionInTable = findIndex(this.localSongs, { sId: data.songId });
        let doesMediaIdMatch = false;

        if (positionInTable !== -1) {
            const mId = data.mediaId && data.mediaId.toString();
            doesMediaIdMatch =
                this.localSongs[positionInTable].category &&
                this.localSongs[positionInTable].category.staged &&
                this.localSongs[positionInTable].category.staged.find(item => item.media_id === mId);
        }
        const scrollToRow =
            data.source === SIDERAIL_ACTION && doesMediaIdMatch ? positionInTable * this.rowHeight : null;

        return (
            <div className="table-container">
                <FixedTable
                    touchScrollEnabled
                    rowClassNameGetter={this.highlightSelectedRow}
                    onRowClick={this.onRowClick}
                    groupHeaderHeight={35}
                    headerHeight={60}
                    rowsCount={songs.length}
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
            consolidated3Total: getColumnValue('popTotalConsolidated3'),
            metricKey: 'pop.score',
        },
        '2pop': {
            score: getColumnValue('twoPopCore'),
            total: getColumnValue('twoPopTotal'),
            hisp: getColumnValue('twoPopHispanic'),
            white: getColumnValue('twoPopWhite'),
            asian: getColumnValue('twoPopAsian'),
            aa: getColumnValue('twoPopAa'),
            aahisp: getColumnValue('twoPopAaHisp'),
            male: getColumnValue('twoPopMale'),
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
            female: getColumnValue('ptlFemale'),
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
    cmmCustomConsolidatedOmt: { data: cmmCustomConsolidatedOmt },
}) => {
    const spins = ((songCompetitor.data || {}).competitor_song_spins || []).map(items => ({
        key: Object.keys(items)[0],
        val: Object.values(items)[0],
    }));
    const { staged, current, prior, recommended, config } = songVersions.data;

    const mergedSongData = songs.data.reduce((result, song) => {
        const stagedVersion = (staged && staged[song.sId]) || [];
        const currentVersion = (current && current[song.sId]) || [];
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
