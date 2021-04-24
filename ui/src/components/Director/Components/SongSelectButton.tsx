import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SongSelectButton = props => {
    const { selectSong, song } = props;
    return (
        <Link className="song-select-link" to="/director/music-point/station">
            <button className="btn btn-primary director-song-select" type="button" onClick={() => selectSong(song)}>
                SELECT
            </button>
        </Link>
    );
};

SongSelectButton.propTypes = {
    selectSong: PropTypes.func.isRequired,
    song: PropTypes.number.isRequired,
};

export default SongSelectButton;
