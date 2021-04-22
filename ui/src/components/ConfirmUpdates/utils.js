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

const checkChanges = (props, actualMedia = {}, previousMedia = {}, stagedMedia = {}) => {
    const result = {
        actualChanges: {},
        previousChanges: {},
        undoneChanges: {},
        isEqualMedia: false,
    };

    props.forEach(prop => {
        const previous = previousMedia[prop] !== undefined ? previousMedia[prop] : '';
        const actual = actualMedia[prop] !== undefined ? actualMedia[prop] : '';
        const staged = stagedMedia[prop] !== undefined ? stagedMedia[prop] : '';
        const hasChanges = !isEqual(actual, previous);

        const haschangesUndone =
            staged !== '' &&
            previous !== '' &&
            !isEqual(actual, staged) &&
            isEqual(actual, previous);

        if (hasChanges) {
            result.actualChanges[prop] = actual;
        } else if (haschangesUndone) {
            result.undoneChanges[prop] = actual;
        }

        result.previousChanges[prop] = previous;
    });

    result.isEqualMedia = isEmpty(result.actualChanges);

    return result;
};

/**
 * Get changes to be confirmed
 * @param {Array} staged Array containing staged category data
 * @param {Array} current Array containing current category data
 * @param {Array} packets Array containing packets data
 * @returns {Array} Array of object containing all changes with the previous data
 */
const getChangesToConfirmUpdates = (staged, current, packets) =>
    staged.map(version => {
        const previousChanges = current.find(
            currentVersion => currentVersion.media_id === version.media_id
        );
        const previousPacket = packets.find(
            packet => previousChanges && previousChanges.packet_id === packet.packet_id
        );
        const stagedPacket = packets.find(
            packet => version && version.packet_id === packet.packet_id
        );

        return {
            ...version,
            currentPacketId: previousChanges ? previousChanges.packet_id : null,
            currentPacket: previousPacket ? previousPacket.name : null,
            packetName: stagedPacket ? stagedPacket.name : null,
            currentRestrictionId: previousChanges ? previousChanges.restriction_id : null,
            currentAlternate: previousChanges ? previousChanges.alternate : {},
        };
    });
/**
 * Get review validate songs in review page
 * @param {Array} categories Array containing categories category data
 * @param {Array} songVersions Array containing song versions category data
 */
const groupByCategory = (categories, songVersions, changes = []) => {
    const initialGroups = categories.map(category => ({
        ...category,
        songs: [],
    }));
    const mergedSongs = unionBy(changes, songVersions, 'media_id').filter(song => song.media_id);
    const outOfSync = songVersions.filter(song => !song.media_id);
    return mergedSongs.concat(outOfSync).reduce((groups, song) => {
        if (!song.media_id) {
            // this handles "Out of sync" category
            return groups.map(group => {
                if (group.label === 'Out of sync') {
                    return {
                        ...group,
                        songs: group.songs.concat(song),
                    };
                }
                return group;
            });
        }
        if (isEmpty(song.category)) {
            // this handles "None" category
            return groups.map(group => {
                if (group.label === 'None') {
                    return {
                        ...group,
                        songs: group.songs.concat(song),
                    };
                }
                return group;
            });
        }
        const currentCategory = song.category;
        return groups.map(group => {
            // handles all other categories
            if (group.label === currentCategory.name) {
                return {
                    ...group,
                    songs: group.songs.concat(song),
                };
            }
            return group;
        });
    }, initialGroups);
};

/**
 * Get categories not found on Gselector
 * @param {Array} categories Array containing categories category data
 * @param {Array} categoryChanges Array containing confirm changes
 * @param {String} type String that identify what information we need
 * @returns {Array} Array of string containing all categories not found in Gselector
 */
const categoriesNotFoundOnGselector = (categories, categoryChanges, type) => {
    const disabledCategories = categories
        .filter(cat => !cat.active && cat.value)
        .map(cat => cat.label);

    let newCategoriesList = [];

    if (type === 'category') {
        newCategoriesList = categoryChanges
            .map(item => (!isEmpty(item.category) ? item.category.name : null))
            .filter((item, index, arr) => arr.indexOf(item) === index);
    }

    if (type === 'alternate_category') {
        newCategoriesList = categoryChanges
            .map(song => {
                const newCategory = [];
                Object.keys(song.alternate).forEach(idx => {
                    newCategory.push(
                        get(
                            categories.find(cat => cat.value === song.alternate[idx].category_id),
                            'label'
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
 * @param {Array} stagedDayparts Array containing staged dayparts
 * @param {Array} changesToConfirm Array of object containing all changes with the previous data
 * @param {Object} currentSongs Object containing current songs
 * @returns {Array} Array of songs
 */
const getSongsWithDaypartTemplateChanged = (stagedDayparts, changesToConfirm, currentSongs) => {
    const songsWithDaypartTemplateChanged = [];
    stagedDayparts.forEach(currentDaypart => {
        const affectedStagedSongs = changesToConfirm.filter(
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
                currentAlternate: currentSong[0].alternate,
                daypartChanged: true,
                daypartChangedId: currentDaypart.id,
            })
        );
    });

    return songsWithDaypartTemplateChanged;
};

/**
 * Get songs changed by daypart updates
 * @param {Array} stagedDayparts Array containing staged dayparts
 * @param {Array} changesToConfirm Array of object containing all changes with the previous data
 * @param {Object} currentSongs Object containing current songs
 * @returns {Array} Array of songs
 */
const getSongsChangedByDaypartUpdates = (stagedDayparts, changesToConfirm, currentSongs) => {
    const buildAlternateDiff = song => {
        const { alternate, currentAlternate } = song;
        const songs = [];
        Object.keys(alternate).forEach(idx => {
            if (!isEqual(alternate[idx], currentAlternate[idx])) {
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
