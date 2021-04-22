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

export const getDaypartCategories = (dayPartCategories, stationCategories) => {
    // The last item in the array is 'None' option
    const categories = stationCategories.keySeq();
    const noneOption = categories.length - 1;
    const noneCategory = categories[noneOption];

    const getSelectedCategory = dayPartKey => dayPartCategories[dayPartKey] || noneCategory;

    /* create an object with all day part keys, merging selected values */
    return {
        AMD: getSelectedCategory('AMD'),
        MID: getSelectedCategory('MID'),
        PMD: getSelectedCategory('PMD'),
        EVE: getSelectedCategory('EVE'),
        OVN: getSelectedCategory('OVN'),
    };
};
class MusicTracker extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            breakoutSongInfo: false,
        };
    }

    getCustomizeSettings = () => {
        const {
            preferences: { competitors, musictracker },
            match,
        } = this.props;
        const tableOrder = [];
        const tableSavedSettings = {};
        const stationCompetitors = competitors[match.params.boardId] || [];

        musictracker
            .filter(group => group.items)
            .forEach(columnGroup => {
                columnGroup.items.forEach(item => {
                    tableSavedSettings[item.sortKey] = item;
                });
                let { items } = columnGroup;
                if (columnGroup.key === 'spins' && stationCompetitors.length > 0) {
                    items = orderBy(items.filter(item => !item.labelTemplate).concat(stationCompetitors), 'order');
                }

                const columns = items
                    .filter(column => !column.hidden)
                    .filter(column => column.checked)
                    .map(column => column.sortKey);

                if (columns.length > 0) {
                    tableOrder.push({
                        key: columnGroup.key,
                        fixed: columnGroup.fixed,
                        columns,
                    });
                }
            });

        return { tableOrder, tableSavedSettings };
    };

    handleToggleCategory = (data, rowIndex, event, metricKey, mediaId) => {
        const { openSongInfo } = this.props;
        const row = data[rowIndex];
        const ccid = mediaId || (row[0] ? row[0].media_id : 0);
        openSongInfo(row, metricKey, ccid);
    };

    onMetricDetail = (row, rowIndex, metricKey) => {
        const { getMetricDetailsAction } = this.props;
        // this retrieves the  data from db and stores it in redux to use later
        getMetricDetailsAction(row, rowIndex, metricKey);
    };

    openSongBreakout = (data, rowIndex) => {
        const songId = data[rowIndex] ? data[rowIndex].sId : false;
        if (songId) {
            const breakoutSongInfo = {
                songIdList: uniq(data.map(song => song.sId)),
                selectedSongId: songId,
            };
            this.setState({ breakoutSongInfo });
        }
    };

    onSongDetailClose = () => {
        this.setState({ breakoutSongInfo: false });
    };

    render() {
        const {
            mtData: {
                categoryDetails: { stationCategories, stationCategoriesPermissions, rawStationCategories },
            },
            match,
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
            <div className="music-tracker">
                <TableWrapper>
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
                                stationCategories={stationCategories}
                                tableSavedSettings={tableSavedSettings}
                                width={width}
                                detailOpened={detailOpened}
                                openSongInfo={openSongInfo}
                                songInfoSelected={songInfoSelected}
                                versionsWithPacket={versionsWithPacket}
                                breakoutSongInfo={breakoutSongInfo}
                                onSongDetailClose={this.onSongDetailClose}
                                catChangeIDs={catChangeIDs}
                                bottomBarOpened={bottomBarOpened}
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
