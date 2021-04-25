// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
import PropTypes from 'prop-types';

const SongHeader = props => {
    const { songName, artistName, className } = props;
    return (
        <div className={`header-song-background ${className}`}>
            <h4 className="header-song-name">{songName}</h4>
            <p className="header-song-artist">{artistName}</p>
        </div>
    );
};

SongHeader.propTypes = {
    artistName: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

SongHeader.defaultProps = {
    className: '',
};

export default SongHeader;
