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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
            isCompareEnabled: false,
            sortOptionChanged: false,
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
    const onFilterSaveOverride = filters => {
        const { applied } = boardDetails.filters;
        const dateRange = { ...applied.dateRange };
        const mergedFilters = { ...applied, dateRange };

        Object.keys(filters).forEach(key => {
            // @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component.
            mergedFilters[key] = filters[key];
        });
        onFilterSave(mergedFilters);
    };

    const hiddenHeaderCompare = selectedSongs.length <= 1;

    return (
        <div>
            {/* @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component. */}
            <HeaderCompare
                onFilterSave={onFilterSaveOverride}
                loading={loading}
                trendsEnabled={enabled}
                onToggleTrends={onToggleTrendsAction}
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: (filters: any) => void; load... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
                songsSelected={selectedSongs.length}
                isCompareDisabled={isCompareEnabled}
                onSongClear={onSongClear}
                onSongCompare={onSongCompare}
                hidden={hiddenHeaderCompare}
            />
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: (filters: any) => void; load... Remove this comment to see the full error message */}
            {hiddenHeaderCompare && show && <CustomizeTable match={match} />}
            <HeaderMusicTracker
                onFilterSave={onFilterSaveOverride}
                // @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component.
                loading={loading}
                trendsEnabled={enabled}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                onToggleTrends={onToggleTrendsAction}
                hidden={!hiddenHeaderCompare}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                boardId={match.params.boardId}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                filters={boardDetails.filters}
            />
        </div>
    );
};

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const mapStateToProps = state => ({
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    musicTracker: state.musicTracker,
    boardDetails: state.boardDetails,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    preferences: state.preferences,
    trends: state.songTrends,
    similarStations: state.similarStations,
});

const mapDispatchToProps = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onFilterSave: (filters: any) => void; load... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    updateCompareOptionsAction: updateCompareOptions,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    closeMetricDetailsAction: closeMetricDetails,
    loadSongsAction: loadSongs,
    onToggleTrendsAction: onToggleTrends,
};

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
TableHelmet.propTypes = {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    boardDetails: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    closeMetricDetailsAction: PropTypes.func.isRequired,
    loadSongsAction: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
