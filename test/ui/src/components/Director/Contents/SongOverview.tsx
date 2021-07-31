import React from 'react';
import { connect } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
import MusicPlayer from 'components/Director/Components/MusicPlayer';

class SongOverview extends React.Component {
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
            songs, loading, count, error, selectSong,
        } = this.props;

        if (error) {
            return (
                <div className="music-point-table">
                    <h4 className="musicpoint-table-header">
                        An error occured, please try again or contact your administrator.
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                    </h4>
                </div>
            );
        }

        const songTable = (
            <div className="music-point-table">
                <h4 className="musicpoint-table-header">{count ? 'Song Overview' : 'No songs to display'}</h4>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                <ul className="musicpoint-table-ul">
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type. */}
                    <li className="music-point-table-item">
                        <span className="musicpoint-table-span-head">Song</span>
                        <span className="musicpoint-table-span-head">Artist</span>
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSelectSong: any; song: any; }' is not as... Remove this comment to see the full error message */}
                        <span className="musicpoint-table-span-head">Version</span>
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                        <span className="musicpoint-table-span-head player-col">Player</span>
                    </li>
                    {songs.map((song, index) => {
                        const {
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            title: songName, artist, version, number,
                        } = song;
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSelectSong: any; song: any; }' is not as... Remove this comment to see the full error message
                        const listClass = classNames('music-point-table-item', {
                            'musicpoint-table-opprow-color': (index + 1) % 2,
                        });
                        return (
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            <li className={listClass} key={number}>
                                <span className="musicpoint-table-span">{songName}</span>
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSelectSong: any; song: any; }' is not as... Remove this comment to see the full error message */}
                                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message */}
                                <span className="musicpoint-table-span">{artist}</span>
                                <span className="musicpoint-table-span">{version}</span>
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                <MusicPlayer onSelectSong={selectSong} song={song.number} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        return loading ? <LoadingIndicator /> : songTable;
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
SongOverview.propTypes = {
    count: PropTypes.number.isRequired,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
    loading: PropTypes.bool.isRequired,
    selectSong: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    error: PropTypes.string,
};

SongOverview.defaultProps = { error: null };

const mapStateToProps = ({ songs }) => ({
    songs: songs.data,
    loading: songs.loading,
    count: songs.count,
    error: songs.error,
});

export default connect(mapStateToProps, null)(SongOverview);
