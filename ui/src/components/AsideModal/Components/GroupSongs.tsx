// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'labelToGroupSongs' implicitly has... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'enableAlternateCategory' implicit... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'icon' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
import SongDetails from './SongDetails';

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'enableAlternateCategory' implicit... Remove this comment to see the full error message
const GroupSongs = ({
    songs,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'categoriesList' implicitly has an... Remove this comment to see the full error message
    handleClick,
    icon,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'daypartId' implicitly has an 'any... Remove this comment to see the full error message
    onChangePercentage,
    labelToGroupSongs,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'alternateCategoriesChanges' impli... Remove this comment to see the full error message
    enableAlternateCategory,
    categoriesList,
    daypartId,
    onAlternateCategory,
    alternateCategoriesChanges,
}) => (
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    <div className="template-song__songs">
        <p className="template-song__label">
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            {songs && songs.length >= 1 ? labelToGroupSongs.withSong : labelToGroupSongs.noSong}
        </p>
        {songs
            && songs.map(song => (
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                <div key={`${song.media_id}`}>
                    <SongDetails
                        song={song}
                        handleClick={handleClick}
                        icon={icon}
                        onChangePercentage={onChangePercentage}
                        enableAlternateCategory={enableAlternateCategory}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
GroupSongs.propTypes = {
    handleClick: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    categoriesList: PropTypes.arrayOf(PropTypes.object),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    daypartId: PropTypes.number,
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
