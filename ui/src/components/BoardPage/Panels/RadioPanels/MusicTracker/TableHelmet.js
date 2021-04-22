import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { updateCompareOptions } from 'stores/musicTracker/musicTrackerActions';
import HeaderCompare from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/HeaderCompare';
import HeaderMusicTracker from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/HeaderMusicTracker';
import CustomizeTable from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTable';
import { onToggleTrends } from 'stores/songTrends/songTrendsActions';
import { loadSongs } from 'stores/songs/songsActions';
import { closeMetricDetails } from 'stores/similarStations/similarStationsActions';

const TableHelmet = props => {
    const {
        openSongInfo,
        boardDetails,
        updateCompareOptionsAction,
        similarStations: { open },
        loadSongsAction,
        closeMetricDetailsAction,
        onFilterSave,
        onToggleTrendsAction,
        musicTracker: {
            compare: { isCompareEnabled, selectedSongs, sortOptionChanged },
        },
        preferences: { show },
        loading,
        trends: { enabled },
        match,
    } = props;

    const onSongCompare = () => {
        // TODO: compare functionality needs to be rewritten
        updateCompareOptionsAction({
            // update the compare options
            selectedSongs,
            isCompareEnabled: true,
            sortOptionChanged: false,
        });
        // here is the only location we pass an array of song id
        // rather than passing the
        // the whole song object and this is handled appropriately
        // in the openSongInfo method so we should be good.
        openSongInfo(selectedSongs, 'compare');
    };

    const onSongClear = () => {
        // if the user has chnaged the sort options on compare view get the
        // data based on the new sort field
        if (sortOptionChanged) {
            // load songs again as the options has changed
            const { layout, filters } = boardDetails;
            loadSongsAction(filters, layout.board.id, layout.board.type);
        }

        if (open) {
            // this closes metric details popup
            closeMetricDetailsAction();
        }

        // update the compare options
        updateCompareOptionsAction({
            selectedSongs: [],
            isCompareEnabled: false,
            sortOptionChanged: false,
        });
    };

    const onFilterSaveOverride = filters => {
        const { applied } = boardDetails.filters;
        const dateRange = { ...applied.dateRange };
        const mergedFilters = { ...applied, dateRange };

        Object.keys(filters).forEach(key => {
            mergedFilters[key] = filters[key];
        });
        onFilterSave(mergedFilters);
    };

    const hiddenHeaderCompare = selectedSongs.length <= 1;

    return (
        <div>
            <HeaderCompare
                onFilterSave={onFilterSaveOverride}
                loading={loading}
                trendsEnabled={enabled}
                onToggleTrends={onToggleTrendsAction}
                songsSelected={selectedSongs.length}
                isCompareDisabled={isCompareEnabled}
                onSongClear={onSongClear}
                onSongCompare={onSongCompare}
                hidden={hiddenHeaderCompare}
            />
            {hiddenHeaderCompare && show && <CustomizeTable match={match} />}
            <HeaderMusicTracker
                onFilterSave={onFilterSaveOverride}
                loading={loading}
                trendsEnabled={enabled}
                onToggleTrends={onToggleTrendsAction}
                hidden={!hiddenHeaderCompare}
                boardId={match.params.boardId}
                filters={boardDetails.filters}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    musicTracker: state.musicTracker,
    boardDetails: state.boardDetails,
    preferences: state.preferences,
    trends: state.songTrends,
    similarStations: state.similarStations,
});

const mapDispatchToProps = {
    updateCompareOptionsAction: updateCompareOptions,
    closeMetricDetailsAction: closeMetricDetails,
    loadSongsAction: loadSongs,
    onToggleTrendsAction: onToggleTrends,
};

TableHelmet.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    closeMetricDetailsAction: PropTypes.func.isRequired,
    loadSongsAction: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape().isRequired,
    musicTracker: PropTypes.shape().isRequired,
    openSongInfo: PropTypes.func.isRequired,
    preferences: PropTypes.shape().isRequired,
    similarStations: PropTypes.shape().isRequired,
    trends: PropTypes.shape().isRequired,
    updateCompareOptionsAction: PropTypes.func.isRequired,
    onFilterSave: PropTypes.func.isRequired,
    onToggleTrendsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHelmet);
