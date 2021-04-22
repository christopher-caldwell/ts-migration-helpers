import React from 'react';
import PropTypes from 'prop-types';
import SongDetails from './SongDetails';

const GroupSongs = ({
    songs,
    handleClick,
    icon,
    onChangePercentage,
    labelToGroupSongs,
    enableAlternateCategory,
    categoriesList,
    daypartId,
    onAlternateCategory,
    alternateCategoriesChanges,
}) => (
    <div className="template-song__songs">
        <p className="template-song__label">
            {songs && songs.length >= 1 ? labelToGroupSongs.withSong : labelToGroupSongs.noSong}
        </p>
        {songs
            && songs.map(song => (
                <div key={`${song.media_id}`}>
                    <SongDetails
                        song={song}
                        handleClick={handleClick}
                        icon={icon}
                        onChangePercentage={onChangePercentage}
                        enableAlternateCategory={enableAlternateCategory}
                        categoriesList={categoriesList}
                        daypartId={daypartId}
                        onAlternateCategory={category => {
                            onAlternateCategory(category, song, daypartId);
                        }}
                        alternateCategoriesChanges={alternateCategoriesChanges}
                    />
                </div>
            ))}
    </div>
);

GroupSongs.propTypes = {
    handleClick: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    categoriesList: PropTypes.arrayOf(PropTypes.object),
    daypartId: PropTypes.number,
    enableAlternateCategory: PropTypes.bool,
    icon: PropTypes.string,
    labelToGroupSongs: PropTypes.shape(),
    onChangePercentage: PropTypes.func,
    onAlternateCategory: PropTypes.func,
    alternateCategoriesChanges: PropTypes.shape(),
};

GroupSongs.defaultProps = {
    icon: 'fa-plus',
    onChangePercentage: () => {},
    onAlternateCategory: () => {},
    labelToGroupSongs: {
        noSong: 'Select a song:',
        withSong: 'Songs selected:',
    },
    enableAlternateCategory: false,
    categoriesList: [],
    daypartId: null,
    alternateCategoriesChanges: {},
};

export default GroupSongs;
