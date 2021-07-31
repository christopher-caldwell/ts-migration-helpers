import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import getNumberWithComma from 'utils/NumberFunctions';
import abbreviateNumber from 'utils/abbreviateNumber';
import { Chart } from 'components/Visualizations/LabelSeriesChart';
import Table from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Table';
import MusicTrackerFilterHeader from 'components/BoardPage/Filters/MusicTrackerFilterHeader';

const order = [
    {
        key: 'playlistSongInformation',
        fixed: true,
        columns: ['title', 'artist', 'label'],
    },
    {
        key: 'mediabase',
        columns: [
            'mediabase.spins.totalAudience',
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
            'mediabase.spins.current',
            'mediabase.spins.previous',
            'mediabase.spins.historical',
            'mediabase.spins.marketPercent',
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFilter' implicitly has an 'any' ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
            'mediabase.spins.market',
            'mediabase.spins.6am7pm',
        ],
    },
];

class PlaylistOverview extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFilter' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.onFilterSaveOverride = this.onFilterSaveOverride.bind(this);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFilter' implicitly has an 'any' ... Remove this comment to see the full error message
    onFilterSaveOverride(currentFilter) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { filters, onFilterSave } = this.props;
        const { applied } = filters;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const mergedFilters = { ...applied };

        Object.keys(currentFilter).forEach(key => {
            mergedFilters[key] = currentFilter[key];
        });

        onFilterSave(mergedFilters);
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { songs, loading, layout } = this.props;
        if (!layout || !layout.board) return null;

        const {
            metrics: { gcrAnalysis, totalAudienceSpins, topNewSongs, callLetter },
        } = layout.board.panels.PlaylistOverview;

        // Calculate marketPercent
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const songMetrics = songs.map(song =>
            merge(song, {
                mediabase: {
                    spins: {
                        marketPercent: Math.round(
                            (song.mediabase.spins.current / song.mediabase.spins.market) * 100
                        ),
                    },
                },
            })
        );

        const topSongsRows = [...topNewSongs].map(song => (
            <tr key={song.id}>
                <td className="playlist-td-rank">{song.rank}</td>
                <td className="playlist-td-title">
                    <div className="playlist-song-title">{song.title}</div>
                    <div className="playlist-song-artist">{song.artist}</div>
                </td>
                <td className="playlist-td-metric">{getNumberWithComma(song.audienceSpins, 1)}</td>
            </tr>
        ));

        return (
            <div className="music-tracker">
                <div className="music-tracker-header">
                    <div className="music-tracker-filters">
                        <MusicTrackerFilterHeader
                            onFilterSave={this.onFilterSaveOverride}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="playlist-body">
                    <div className="playlist-table">
                        <Table
                            defaultSort={{
                                key: 'mediabase.spins.totalAudience',
                                ascending: false,
                            }}
                            order={order}
                            station={songMetrics}
                            tableProps={{ headerHeight: 50 }}
                            useContainerHeight
                            callLetter={callLetter}
                        />
                    </div>
                    <div className="playlist-stats">
                        <div className="playlist-stats-panel playlist-total-audience-spins">
                            <span className="playlist-stats-header">
                                Total Audience Spins (Impressions)
                            </span>
                            <div className="playlist-stats-body">
                                <div className="playlist-stats-value">
                                    {abbreviateNumber(totalAudienceSpins)}
                                </div>
                            </div>
                        </div>
                        <div className="playlist-stats-panel playlist-top-songs">
                            <span className="playlist-stats-header">Top 10 New Songs</span>
                            <div className="playlist-stats-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="playlist-th-rank">Station Rank</th>
                                            <th className="playlist-td-title">Song</th>
                                            <th className="playlist-th-metric">
                                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                                Total Audience Spins
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{topSongsRows}</tbody>
                                </table>
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            </div>
                        </div>
                        <div
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            className={`
                                playlist-stats-panel
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                playlist-pie-chart
                                playlist-pie-gcr-analysis
                            `}
                        >
                            <span className="playlist-stats-header p3">CRG Analysis</span>
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            <div className="playlist-stats-body">
                                <Chart
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                                    options={{ tooltips: { enabled: false } }}
                                    series={gcrAnalysis}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    stacked={false}
                                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                                    type="doughnut"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PlaylistOverview.propTypes = {
    filters: PropTypes.shape({
        applied: PropTypes.shape({
            overview: PropTypes.shape({
                gcr: PropTypes.string.isRequired,
                daypart: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    layout: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFilterSave: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    songs: state.songs.data,
    filters: state.boardDetails.filters,
    layout: state.boardDetails.layout,
    loading: state.songs.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistOverview);
