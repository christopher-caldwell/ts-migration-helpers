import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import MusicPlayer from 'components/Director/Components/MusicPlayer';

class SongOverview extends React.Component {
    render() {
        const {
            songs, loading, count, error, selectSong,
        } = this.props;

        if (error) {
            return (
                <div className="music-point-table">
                    <h4 className="musicpoint-table-header">
                        An error occured, please try again or contact your administrator.
                    </h4>
                </div>
            );
        }

        const songTable = (
            <div className="music-point-table">
                <h4 className="musicpoint-table-header">{count ? 'Song Overview' : 'No songs to display'}</h4>
                <ul className="musicpoint-table-ul">
                    <li className="music-point-table-item">
                        <span className="musicpoint-table-span-head">Song</span>
                        <span className="musicpoint-table-span-head">Artist</span>
                        <span className="musicpoint-table-span-head">Version</span>
                        <span className="musicpoint-table-span-head player-col">Player</span>
                    </li>
                    {songs.map((song, index) => {
                        const {
                            title: songName, artist, version, number,
                        } = song;
                        const listClass = classNames('music-point-table-item', {
                            'musicpoint-table-opprow-color': (index + 1) % 2,
                        });
                        return (
                            <li className={listClass} key={number}>
                                <span className="musicpoint-table-span">{songName}</span>
                                <span className="musicpoint-table-span">{artist}</span>
                                <span className="musicpoint-table-span">{version}</span>
                                <MusicPlayer onSelectSong={selectSong} song={song.number} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );

        return loading ? <LoadingIndicator /> : songTable;
    }
}

SongOverview.propTypes = {
    count: PropTypes.number.isRequired,
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
