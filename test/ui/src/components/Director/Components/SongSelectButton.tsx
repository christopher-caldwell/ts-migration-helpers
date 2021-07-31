import React from 'react';

import { Link } from 'react-router-dom';

type Props = {
    selectSong: (...args: any[]) => any;
    song: number;
};

const SongSelectButton =(props: Props) => {
    const { selectSong, song } = props;
    return (
        <Link className="song-select-link" to="/director/music-point/station">
            <button className="btn btn-primary director-song-select" type="button" onClick={() => selectSong(song)}>
                SELECT
            </button>
        </Link>
    );
};

export default SongSelectButton;
