import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SongSelectButton from './SongSelectButton';

class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStatus: 'none',
        };
        this.player = null;

        this.playerCreator = event => {
            this.player = event;
        };
    }

    play = () => {
        this.setState({ playerStatus: 'playing' });
        this.player.current.play();
    };

    pause = () => {
        this.setState({ playerStatus: 'paused' });
        this.player.current.pause();
    };

    rewind = () => {
        const { currentTime } = this.player.current;
        const nextTime = currentTime - 10;
        this.player.current.currentTime = nextTime > 0 ? nextTime : 0;
    };

    forward = () => {
        const { currentTime, duration } = this.player.current;
        const nextTime = currentTime + 10;
        this.player.current.currentTime = nextTime < duration ? nextTime : duration - 1;
    };

    end = () => {
        this.setState({ playerStatus: 'paused' });
        this.player.current.currentTime = 0;
    };

    // span numbers below are just representing song duration times when we have backend
    render() {
        const { onSelectSong, song } = this.props;
        return (
            <div className="music-player-container">
                <div className="music-bar-container">
                    <span>0:00</span>
                    <div className="music-bar" />
                    <span>3:00</span>
                </div>
                <div className="audio-button-container">
                    {/* <audio ref={this.playerCreator} preload="none" type="audio/mp3" src="" onEnded={this.end}>
                        Your browser does not support the audio element
                    </audio> */}
                    <button type="button" className="video-controls" onClick={this.rewind}>
                        <i className="fa fa-backward" />
                    </button>
                    {this.state.playerStatus !== 'playing' ? (
                        <button type="button" className="video-controls" onClick={this.play}>
                            <i className="fa fa-play" />
                        </button>
                    ) : (
                        <button type="button" className="video-controls" onClick={this.pause}>
                            <i className="fa fa-pause" />
                        </button>
                    )}
                    <button type="button" className="video-controls" onClick={this.forward}>
                        <i className="fa fa-forward" />
                    </button>
                    <SongSelectButton selectSong={onSelectSong} song={song} />
                </div>
            </div>
        );
    }
}

MusicPlayer.propTypes = {
    song: PropTypes.number.isRequired,
    onSelectSong: PropTypes.func.isRequired,
};

export default MusicPlayer;
