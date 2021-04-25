import unionBy from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import get from 'lodash/get';

/**
 * Compare values from current data and staged data
 * @param {Array} props Array containing props to validate
 * @param {Object} staged Object containing staged values
 * @param {Object} current Object containing current values
 * @returns {Boolean} Return TRUE if is all props are equals in both objects
 */

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prop' implicitly has an 'any' type.
const checkChanges = (props, actualMedia = {}, previousMedia = {}, stagedMedia = {}) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const result = {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        actualChanges: {},
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prop' implicitly has an 'any' type.
        previousChanges: {},
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        undoneChanges: {},
        isEqualMedia: false,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prop' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'staged' implicitly has an 'any' type.
    props.forEach(prop => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packets' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
        const previous = previousMedia[prop] !== undefined ? previousMedia[prop] : '';
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
        const actual = actualMedia[prop] !== undefined ? actualMedia[prop] : '';
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 3.
        const staged = stagedMedia[prop] !== undefined ? stagedMedia[prop] : '';
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const hasChanges = !isEqual(actual, previous);

        const haschangesUndone =
            staged !== '' &&
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            previous !== '' &&
            !isEqual(actual, staged) &&
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            isEqual(actual, previous);
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'staged' implicitly has an 'any' type.

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'current' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (hasChanges) {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            result.actualChanges[prop] = actual;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
        } else if (haschangesUndone) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result.undoneChanges[prop] = actual;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        }

        result.previousChanges[prop] = previous;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
    });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryChanges' implicitly has an 'any... Remove this comment to see the full error message
    result.isEqualMedia = isEmpty(result.actualChanges);

    return result;
};

/**
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
 * Get changes to be confirmed
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
 * @param {Array} staged Array containing staged category data
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
 * @param {Array} current Array containing current category data
 * @param {Array} packets Array containing packets data
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7034) FIXME: Variable 'newCategory' implicitly has type 'any[]'... Remove this comment to see the full error message
 * @returns {Array} Array of object containing all changes with the previous data
 */
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 3.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'staged' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7005) FIXME: Variable 'newCategory' implicitly has an 'any[]' t... Remove this comment to see the full error message
const getChangesToConfirmUpdates = (staged, current, packets) =>
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    staged.map(version => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentVersion' implicitly has an 'any'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSongs' implicitly has an 'any' t... Remove this comment to see the full error message
        const previousChanges = current.find(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
            currentVersion => currentVersion.media_id === version.media_id
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
        );
        const previousPacket = packets.find(
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'packet' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
            packet => previousChanges && previousChanges.packet_id === packet.packet_id
        );
        const stagedPacket = packets.find(
            packet => version && version.packet_id === packet.packet_id
        );

        return {
            ...version,
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            currentPacketId: previousChanges ? previousChanges.packet_id : null,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            currentPacket: previousPacket ? previousPacket.name : null,
            packetName: stagedPacket ? stagedPacket.name : null,
            currentRestrictionId: previousChanges ? previousChanges.restriction_id : null,
            currentAlternate: previousChanges ? previousChanges.alternate : {},
        };
    });
/**
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songsWithDaypartTemplateChanged' implici... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
 * Get review validate songs in review page
 // @ts-expect-error ts-migrate(7034) FIXME: Variable 'songs' implicitly has type 'any[]' in so... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7034) FIXME: Variable 'newCategoriesList' implicitly has type '... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songs' implicitly has an 'any[]' type.
 * @param {Array} categories Array containing categories category data
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
 * @param {Array} songVersions Array containing song versions category data
 */
const groupByCategory = (categories, songVersions, changes = []) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 3.
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'newCategory' implicitly has type 'any[]'... Remove this comment to see the full error message
    const initialGroups = categories.map(category => ({
        ...category,
        songs: [],
    }));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    const mergedSongs = unionBy(changes, songVersions, 'media_id').filter(song => song.media_id);
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'newCategory' implicitly has an 'any[]' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    const outOfSync = songVersions.filter(song => !song.media_id);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    return mergedSongs.concat(outOfSync).reduce((groups, song) => {
        if (!song.media_id) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedDayparts' implicitly has an 'any'... Remove this comment to see the full error message
            // this handles "Out of sync" category
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSongs' implicitly has an 'any' t... Remove this comment to see the full error message
            return groups.map(group => {
                if (group.label === 'Out of sync') {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
                    return {
                        ...group,
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                        songs: group.songs.concat(song),
                    };
                }
                return group;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            });
        }
        if (isEmpty(song.category)) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
            // this handles "None" category
            return groups.map(group => {
                if (group.label === 'None') {
                    return {
                        ...group,
                        songs: group.songs.concat(song),
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    };
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                }
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                return group;
            });
        }
        const currentCategory = song.category;
        return groups.map(group => {
            // handles all other categories
            if (group.label === currentCategory.name) {
                return {
                    ...group,
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songsWithDaypartTemplateChanged' implici... Remove this comment to see the full error message
                    songs: group.songs.concat(song),
                };
            }
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedDayparts' implicitly has an 'any'... Remove this comment to see the full error message
            return group;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changesToConfirm' implicitly has an 'an... Remove this comment to see the full error message
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSongs' implicitly has an 'any' t... Remove this comment to see the full error message
    }, initialGroups);
};

/**
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
 * Get categories not found on Gselector
 // @ts-expect-error ts-migrate(7034) FIXME: Variable 'songs' implicitly has type 'any[]' in so... Remove this comment to see the full error message
 * @param {Array} categories Array containing categories category data
 * @param {Array} categoryChanges Array containing confirm changes
 * @param {String} type String that identify what information we need
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songs' implicitly has an 'any[]' type.
 * @returns {Array} Array of string containing all categories not found in Gselector
 // @ts-expect-error ts-migrate(7034) FIXME: Variable 'daypartUpdates' implicitly has type 'any... Remove this comment to see the full error message
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
const categoriesNotFoundOnGselector = (categories, categoryChanges, type) => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'newCategoriesList' implicitly has type '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
    const disabledCategories = categories
        .filter(cat => !cat.active && cat.value)
        .map(cat => cat.label);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    let newCategoriesList = [];

    if (type === 'category') {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        newCategoriesList = categoryChanges
            .map(item => (!isEmpty(item.category) ? item.category.name : null))
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            .filter((item, index, arr) => arr.indexOf(item) === index);
    }

    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'newCategory' implicitly has type 'any[]'... Remove this comment to see the full error message
    if (type === 'alternate_category') {
        newCategoriesList = categoryChanges
            .map(song => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
                const newCategory = [];
                Object.keys(song.alternate).forEach(idx => {
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'newCategory' implicitly has an 'any[]' t... Remove this comment to see the full error message
                    newCategory.push(
                        get(
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                            categories.find(cat => cat.value === song.alternate[idx].category_id),
                            'label'
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
                        )
                    );
                });
                return newCategory[0];
            })
            .filter((item, index, arr) => arr.indexOf(item) === index)
            .filter(item => item);
    }

    return disabledCategories.filter(cat => newCategoriesList.includes(cat));
};

/**
 * Get songs with daypart template changed
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedDayparts' implicitly has an 'any'... Remove this comment to see the full error message
 * @param {Array} stagedDayparts Array containing staged dayparts
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSongs' implicitly has an 'any' t... Remove this comment to see the full error message
 * @param {Array} changesToConfirm Array of object containing all changes with the previous data
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentDaypart' implicitly has an 'any'... Remove this comment to see the full error message
 * @param {Object} currentSongs Object containing current songs
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
 * @returns {Array} Array of songs
 */
const getSongsWithDaypartTemplateChanged = (stagedDayparts, changesToConfirm, currentSongs) => {
    const songsWithDaypartTemplateChanged = [];
    stagedDayparts.forEach(currentDaypart => {
        const affectedStagedSongs = changesToConfirm.filter(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentSong' implicitly has an 'any' ty... Remove this comment to see the full error message
            currentSong =>
                currentSong.currentAlternate &&
                currentSong.alternate &&
                isEqual(currentSong.currentAlternate, currentSong.alternate) &&
                Object.prototype.hasOwnProperty.call(
                    currentSong.currentAlternate,
                    currentDaypart.id
                )
        );
        affectedStagedSongs.forEach(currentSong =>
            songsWithDaypartTemplateChanged.push({
                ...currentSong,
                daypartChanged: true,
                daypartChangedId: currentDaypart.id,
            })
        );
        const affectedCurrentSongs = filter(
            currentSongs,
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songsWithDaypartTemplateChanged' implici... Remove this comment to see the full error message
            currentSong =>
                currentSong[0].alternate &&
                Object.prototype.hasOwnProperty.call(
                    currentSong[0].alternate || {},
                    currentDaypart.id
                )
        );
        affectedCurrentSongs.forEach(currentSong =>
            songsWithDaypartTemplateChanged.push({
                ...currentSong[0],
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stagedDayparts' implicitly has an 'any'... Remove this comment to see the full error message
                currentAlternate: currentSong[0].alternate,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                daypartChanged: true,
                daypartChangedId: currentDaypart.id,
            })
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'songs' implicitly has type 'any[]' in so... Remove this comment to see the full error message
        );
    });

    return songsWithDaypartTemplateChanged;
};

/**
 * Get songs changed by daypart updates
 * @param {Array} stagedDayparts Array containing staged dayparts
 * @param {Array} changesToConfirm Array of object containing all changes with the previous data
 * @param {Object} currentSongs Object containing current songs
 // @ts-expect-error ts-migrate(7005) FIXME: Variable 'songs' implicitly has an 'any[]' type.
 * @returns {Array} Array of songs
 */
// @ts-expect-error ts-migrate(7034) FIXME: Variable 'daypartUpdates' implicitly has type 'any... Remove this comment to see the full error message
const getSongsChangedByDaypartUpdates = (stagedDayparts, changesToConfirm, currentSongs) => {
    const buildAlternateDiff = song => {
        const { alternate, currentAlternate } = song;
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
        const songs = [];
        Object.keys(alternate).forEach(idx => {
            if (!isEqual(alternate[idx], currentAlternate[idx])) {
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'daypartUpdates' implicitly has an 'any[]... Remove this comment to see the full error message
                songs.push({
                    ...song,
                    alternate: {
                        [idx]: alternate[idx],
                    },
                });
            }
        });

        return songs;
    };

    let daypartUpdates = [];
    changesToConfirm.forEach(song => {
        const { alternate, currentAlternate } = song;

        if (!isEqual(alternate || {}, currentAlternate || {})) {
            daypartUpdates = daypartUpdates.concat(buildAlternateDiff(song));
        }
    });

    if (stagedDayparts.length) {
        daypartUpdates = daypartUpdates.concat(
            getSongsWithDaypartTemplateChanged(stagedDayparts, changesToConfirm, currentSongs)
        );
    }

    return daypartUpdates;
};

export default {
    getChangesToConfirmUpdates,
    groupByCategory,
    categoriesNotFoundOnGselector,
    checkChanges,
    getSongsWithDaypartTemplateChanged,
    getSongsChangedByDaypartUpdates,
};
