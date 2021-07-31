import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';

import MTDataActions from 'stores/musicTrackerData/musicTrackerDataActions';
import TableHelmet from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TableHelmet';
import TableInfiniteScroll from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TableInfiniteScroll';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import TableWrapper from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TableWrapper';
import { getSongDetails, updateSongDetails } from 'stores/breakout/breakoutActions';
import { getMetricDetails } from 'stores/similarStations/similarStationsActions';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartKey' implicitly has an 'any' typ... Remove this comment to see the full error message
export const getDaypartCategories = (dayPartCategories, stationCategories) => {
    // The last item in the array is 'None' option
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartKey' implicitly has an 'any' typ... Remove this comment to see the full error message
    const categories = stationCategories.keySeq();
    const noneOption = categories.length - 1;
    const noneCategory = categories[noneOption];

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartKey' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
    const getSelectedCategory = dayPartKey => dayPartCategories[dayPartKey] || noneCategory;

    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableOrder' implicitly has type 'any[]' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    /* create an object with all day part keys, merging selected values */
    return {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        AMD: getSelectedCategory('AMD'),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnGroup' implicitly has an 'any' ty... Remove this comment to see the full error message
        MID: getSelectedCategory('MID'),
        PMD: getSelectedCategory('PMD'),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
        EVE: getSelectedCategory('EVE'),
        OVN: getSelectedCategory('OVN'),
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
    };
};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableOrder' implicitly has type 'any[]' ... Remove this comment to see the full error message
class MusicTracker extends React.PureComponent {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableOrder' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        this.state = {
            breakoutSongInfo: false,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnGroup' implicitly has an 'any' ty... Remove this comment to see the full error message
        };
    }

    getCustomizeSettings = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getMetricDetailsAction' does not exist o... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            preferences: { competitors, musictracker },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tableOrder' implicitly has type 'any[]' ... Remove this comment to see the full error message
            match,
        } = this.props;
        const tableOrder = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const tableSavedSettings = {};
        const stationCompetitors = competitors[match.params.boardId] || [];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfoSelected' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableOrder' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        musictracker
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnGroup' implicitly has an 'any' ty... Remove this comment to see the full error message
            .filter(group => group.items)
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
            .forEach(columnGroup => {
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ order: any[]; onMetricClick: (row: any, ro... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'getMetricDetailsAction' does not exist o... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongSelect' does not exist on type 'Mu... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                columnGroup.items.forEach(item => {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
                    tableSavedSettings[item.sortKey] = item;
                });
                let { items } = columnGroup;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                if (columnGroup.key === 'spins' && stationCompetitors.length > 0) {
                    items = orderBy(items.filter(item => !item.labelTemplate).concat(stationCompetitors), 'order');
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                }

                const columns = items
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    .filter(column => !column.hidden)
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
                    .filter(column => column.checked)
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songInfoSelected' does not exist on type... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    .map(column => column.sortKey);

                // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChangeIDs' does not exist on type 'Re... Remove this comment to see the full error message
                if (columns.length > 0) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottomBarOpened' does not exist on type ... Remove this comment to see the full error message
                    tableOrder.push({
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'breakoutSongInfo' does not exist on type... Remove this comment to see the full error message
                        key: columnGroup.key,
                        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableOrder' implicitly has an 'any[]' ty... Remove this comment to see the full error message
                        fixed: columnGroup.fixed,
                        columns,
                    });
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
                }
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            });

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaId' implicitly has an 'any' type.
        return { tableOrder, tableSavedSettings };
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ order: any[]; onMetricClick: (row: any, ro... Remove this comment to see the full error message
    };

    handleToggleCategory = (data, rowIndex, event, metricKey, mediaId) => {
        const { openSongInfo } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongSelect' does not exist on type 'Mu... Remove this comment to see the full error message
        const row = data[rowIndex];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
        const ccid = mediaId || (row[0] ? row[0].media_id : 0);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getMetricDetailsAction' does not exist o... Remove this comment to see the full error message
        openSongInfo(row, metricKey, ccid);
    };

    onMetricDetail = (row, rowIndex, metricKey) => {
        const { getMetricDetailsAction } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        // this retrieves the  data from db and stores it in redux to use later
        getMetricDetailsAction(row, rowIndex, metricKey);
    };

    openSongBreakout = (data, rowIndex) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const songId = data[rowIndex] ? data[rowIndex].sId : false;
        if (songId) {
            const breakoutSongInfo = {
                songIdList: uniq(data.map(song => song.sId)),
                selectedSongId: songId,
            };
            this.setState({ breakoutSongInfo });
        }
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mtData' does not exist on type 'Readonly... Remove this comment to see the full error message
    onSongDetailClose = () => {
        this.setState({ breakoutSongInfo: false });
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    render() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            mtData: {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                categoryDetails: { stationCategories, stationCategoriesPermissions, rawStationCategories },
            },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versionsWithPacket' does not exist on ty... Remove this comment to see the full error message
            match,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChangeIDs' does not exist on type 'Re... Remove this comment to see the full error message
            preferences: { loading: prefLoad }, // loading renamed b/c other loading
            onFilterSave,
            loading,
            detailOpened,
            openSongInfo,
            songInfoSelected,
            versionsWithPacket,
            catChangeIDs,
            bottomBarOpened,
        } = this.props;
        const { breakoutSongInfo } = this.state;
        const { tableOrder, tableSavedSettings } = this.getCustomizeSettings();

        if (prefLoad) return <LoadingIndicator className="dashboard-page-loading" />;

        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ order: any[]; onMetricClick: (row: any, ro... Remove this comment to see the full error message
            <div className="music-tracker">
                <TableWrapper>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongSelect' does not exist on type 'Mu... Remove this comment to see the full error message */}
                    <TableHelmet
                        onFilterSave={onFilterSave}
                        loading={loading}
                        openSongInfo={openSongInfo}
                        match={match}
                    />
                    <ContainerDimensions>
                        {({ width }) => (
                            <TableInfiniteScroll
                                order={tableOrder}
                                onMetricClick={this.onMetricDetail}
                                onSongSelect={this.onSongSelect}
                                onTitleClick={this.openSongBreakout}
                                toggleCategory={this.handleToggleCategory}
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                stationCategories={stationCategories}
                                tableSavedSettings={tableSavedSettings}
                                width={width}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                detailOpened={detailOpened}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                openSongInfo={openSongInfo}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                songInfoSelected={songInfoSelected}
                                versionsWithPacket={versionsWithPacket}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                breakoutSongInfo={breakoutSongInfo}
                                onSongDetailClose={this.onSongDetailClose}
                                catChangeIDs={catChangeIDs}
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                bottomBarOpened={bottomBarOpened}
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                                stationCategoriesPermissions={stationCategoriesPermissions}
                                rawStationCategories={rawStationCategories}
                            />
                        )}
                    </ContainerDimensions>
                </TableWrapper>
            </div>
        );
    }
}

MusicTracker.propTypes = {
    bottomBarOpened: PropTypes.bool.isRequired,
    getMetricDetailsAction: PropTypes.func.isRequired,
    getSongDetailsAction: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape().isRequired,
    mtData: PropTypes.shape().isRequired,
    openSongInfo: PropTypes.func.isRequired,
    preferences: PropTypes.shape().isRequired,
    onFilterSave: PropTypes.func.isRequired,
    catChangeIDs: PropTypes.arrayOf(PropTypes.shape()),
    detailOpened: PropTypes.bool,
    songInfoSelected: PropTypes.objectOf(PropTypes.any),
    versionsWithPacket: PropTypes.arrayOf(PropTypes.string),
};

MusicTracker.defaultProps = {
    catChangeIDs: [],
    detailOpened: false,
    songInfoSelected: {},
    versionsWithPacket: [],
};

const mapStateToProps = state => ({
    mtData: state.musicTrackerData,
    store: state.musicTracker,
    preferences: state.preferences,
    similarStations: state.similarStations,
});

const mapDispatchToProps = {
    loadingCategoryDetails: MTDataActions.loadingCategoryDetails,
    storingCategoryDataset: MTDataActions.storingCategoryDataset,
    getSongDetailsAction: getSongDetails,
    getMetricDetailsAction: getMetricDetails,
    updateSongDetailsAction: updateSongDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicTracker);
