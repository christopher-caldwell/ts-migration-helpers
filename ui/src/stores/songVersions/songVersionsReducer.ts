import moment from 'moment';
import unionBy from 'lodash/unionBy';
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import get from 'lodash/get';

import MTUtils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import confirmUpdatesUtils from 'components/ConfirmUpdates/utils';
import {
    SONG_VERSIONS_PENDING,
    SONG_VERSIONS_SUCCESS,
    SONG_VERSIONS_FAILURE,
    UPDATE_VERSION_CATEGORY,
    CLEAR_STAGED_CHANGES,
    STAGE_SONGS_MEDIA,
    CLEAR_CHANGES_UNDONE,
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: {},
    changedVersions: {},
};

const getSongVersion = (songs, payload) => {
    const { songId, mediaId, category } = payload;
    const version = songs && songs.find(item => item.media_id === mediaId);
    // return null when the version that we are looking for is not there in the location
    if (!version) return null;
    // at this point version should not be null if it is
    // then user has dragged that selectedSong from none category so add a new entry
    const drives = !isEmpty(version.category);
    const stagedSongs = (songs[songId] || [])
        // remove the old one
        .filter(item => item.media_id.toString() !== mediaId.toString())
        .concat([
            {
                ...version,
                order_by: category.orderBy,
                modified_date: moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS'),
                type: 'staged',
                category: drives,
            },
        ]); // add the new one

    return stagedSongs;
};

/**
 * Get the staged state for the given song.
 *
 * @param {integer} songId Song id
 * @param {object} state Current state
 * @param {object|null} payload If it is set, try to get version info
 */
const getStagedSong = (songId, state, payload = null) => {
    // TODO: change this when we support dayparts
    const staged = state.data.staged && state.data.staged[songId];
    if (!payload && staged) return staged;

    const current = state.data.current && state.data.current[songId];
    if (!payload && current) return current;

    const prior = state.data.prior && state.data.prior[songId];
    if (!payload && prior) return prior;

    const stagedSongs = getSongVersion(staged, payload);
    if (stagedSongs) return stagedSongs;

    const currentOptions = getSongVersion(current, payload);
    if (currentOptions) return currentOptions;

    const priorOptions = getSongVersion(prior, payload);
    if (priorOptions) return priorOptions;

    return {};
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SONG_VERSIONS_PENDING:
            return { ...state, error: null, loading: true };
        case SONG_VERSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: payload.versions,
            };
        case SONG_VERSIONS_FAILURE:
            return { ...state, error: payload.error, loading: false };
        case UPDATE_VERSION_CATEGORY: {
            const { songId } = payload;
            const staged = state.data.staged && state.data.staged[songId];
            const stagedSongs = getStagedSong(songId, state, payload);

            // if there exists staged need to do a merge of newly dragged item to the staged
            if (staged && stagedSongs) {
                const merged = MTUtils.mergeAndReOrder('media_id', stagedSongs, state.data.staged[songId]);
                return {
                    ...state,
                    data: {
                        ...state.data,
                        staged: { ...state.data.staged, [songId]: merged },
                    },
                };
            }

            return {
                ...state,
                data: {
                    ...state.data,
                    staged: { ...state.data.staged, [songId]: stagedSongs },
                },
            };
        }
        case CLEAR_STAGED_CHANGES:
            return {
                ...state,
                data: { ...state.data, staged: {} },
                changedVersions: {},
            };
        case STAGE_SONGS_MEDIA: {
            const { songs } = action.payload;

            const currentVersions = { ...state.data.current };
            const stagedVersions = { ...state.data.staged };
            const changedVersions = { ...state.changedVersions };
            const flattenedStaged = MTUtils.flatVersions(stagedVersions);
            const flattenedCurrent = MTUtils.flatVersions(currentVersions);
            const versionsflattened = unionBy(flattenedStaged, flattenedCurrent, 'media_id');

            songs.forEach(song => {
                const currentMedia = flattenedCurrent.find(crnt => crnt.media_id === song.media_id);
                const stagedMedia = flattenedStaged.find(stg => stg.media_id === song.media_id);
                const propsToMap = ['packet_id', 'restriction_id', 'category', 'alternate'];
                const versionBefore = versionsflattened.find(final => final.media_id === song.media_id);
                const updateVersion = {
                    ...versionBefore,
                    ...(song.category !== undefined && {
                        category: song.category,
                    }),
                    ...(song.packet_id !== undefined && {
                        packet_id: song.packet_id,
                    }),
                    ...(song.restriction_id !== undefined && {
                        restriction_id: song.restriction_id,
                    }),
                    ...(!isEmpty(song.alternate) && {
                        alternate: {
                            ...(currentMedia && currentMedia.alternate),
                            ...(stagedMedia && stagedMedia.alternate),
                            ...song.alternate,
                        },
                    }),
                };

                const getChanges = confirmUpdatesUtils.checkChanges(
                    propsToMap,
                    updateVersion,
                    currentMedia,
                    stagedMedia
                );

                const copyUndoneChanges = get(changedVersions[song.media_id], 'getChanges.undoneChanges', {});

                // it keeps changes undone when some change are saving,
                // in order to show on confim page.
                // it will be delete by clearChangesUndone action

                changedVersions[song.media_id] = {
                    ...updateVersion,
                    getChanges: {
                        ...getChanges,
                        ...(!isEmpty(copyUndoneChanges) && {
                            undoneChanges: copyUndoneChanges,
                        }),
                    },
                };

                stagedVersions[song.sId] = unionBy([updateVersion], stagedVersions[song.sId], 'media_id');
                // Remove media unchanged from current (deep Equal)
                remove(stagedVersions[song.sId], () => getChanges.isEqualMedia);
            });

            return {
                ...state,
                data: {
                    ...state.data,
                    staged: {
                        ...Object.entries(stagedVersions).reduce(
                            (total, [key, value]) => ({
                                // Stage only songs that contains data
                                ...(value && value.length && { [key]: value }),
                                ...total,
                            }),
                            {}
                        ),
                    },
                },
                changedVersions,
            };
        }
        case CLEAR_CHANGES_UNDONE: {
            const changedVersions = { ...state.changedVersions };

            return {
                ...state,
                changedVersions: {
                    ...Object.entries(changedVersions).reduce(
                        (total, [key, value]) => ({
                            ...{
                                [key]: {
                                    ...value,
                                    getChanges: {
                                        ...value.getChanges,
                                        undoneChanges: {},
                                    },
                                },
                            },
                            ...total,
                        }),
                        {}
                    ),
                },
            };
        }
        default:
            return state;
    }
};
