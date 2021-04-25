import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SongSelectButton from './SongSelectButton';

class MusicPlayer extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
    constructor(props) {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        super(props);
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerCreator' does not exist on type 'M... Remove this comment to see the full error message
        this.state = {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            playerStatus: 'none',
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        };
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectSong' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player = null;

        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.playerCreator = event => {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerStatus' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
            this.player = event;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        };
    }

    play = () => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.setState({ playerStatus: 'playing' });
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player.current.play();
    };

    pause = () => {
        this.setState({ playerStatus: 'paused' });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectSong' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player.current.pause();
    };

    rewind = () => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        const { currentTime } = this.player.current;
        const nextTime = currentTime - 10;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player.current.currentTime = nextTime > 0 ? nextTime : 0;
    };

    forward = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerStatus' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        const { currentTime, duration } = this.player.current;
        const nextTime = currentTime + 10;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player.current.currentTime = nextTime < duration ? nextTime : duration - 1;
    };

    end = () => {
        this.setState({ playerStatus: 'paused' });
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'player' does not exist on type 'MusicPla... Remove this comment to see the full error message
        this.player.current.currentTime = 0;
    };

    // span numbers below are just representing song duration times when we have backend
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectSong' does not exist on type 'Re... Remove this comment to see the full error message
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
