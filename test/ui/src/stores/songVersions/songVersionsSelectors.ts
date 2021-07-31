import uniq from 'lodash/uniq';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
export const getFlattenedVersions = (songs, songVersions) => {
    const versionData = songVersions.data;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const invertedData = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Object.keys(versionData.current || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            current: songVersions.data.current[songId],
        };
    });
    Object.keys(versionData.prior || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            prior: songVersions.data.prior[songId],
        };
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    Object.keys(versionData.staged || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'version_name' does not exist on type 'ne... Remove this comment to see the full error message
            ...invertedData[songId],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'modified_date' does not exist on type 'n... Remove this comment to see the full error message
            staged: songVersions.data.staged[songId],
        };
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternate' does not exist on type 'never... Remove this comment to see the full error message
    Object.keys(versionData.recommended || {}).forEach(songId => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        invertedData[songId] = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ...invertedData[songId],
            recommended: songVersions.data.recommended[songId],
        };
    });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    const musicTrackerSongIds = songs.data.map(song => song.sId);
    const gselectorSongIds = Object.keys(invertedData).map(item => parseInt(item, 10));
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
    const mergedSongIds = [...gselectorSongIds, ...musicTrackerSongIds];
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const ddedup = uniq(mergedSongIds);
    const songsWithVersions = ddedup.map(songId => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
        const song = songs.data.find(s => (s && s.sId ? s.sId.toString() === songId.toString() : false));

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const categories = invertedData[songId] || {
            staged: null,
            current: null,
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'version_name' does not exist on type 'ne... Remove this comment to see the full error message
        if (song) return { ...song, category: categories };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'modified_date' does not exist on type 'n... Remove this comment to see the full error message
        const version = utils.mergeAndReOrder('media_id', categories.staged, categories.current)[0];
        if (version) {
            return {
                ...song,
                sId: parseInt(songId, 10),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
                metadata: { aNm: version.aNm, sNm: version.sNm },
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
                category: categories,
            };
        }
        return undefined;
    });
    const songsWithVersionsFiltered = songsWithVersions.filter(item => item);
    const flattenedVersions = songsWithVersionsFiltered.reduce((flattened, song) => {
        const {
            category,
            sId,
            metadata: { aNm, sNm },
            metrics,
        } = song;
        const parentSong = { sId, sNm, aNm };
        const concatted = ['staged', 'current'].reduce((consolidated, time) => {
            const versions = category[time] ? Object.values(category[time]) : null;
            if (!versions) return consolidated;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
            const versionsToAdd = versions.filter(v => !consolidated.find(c => c.media_id === v.media_id));

            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            return consolidated.concat(versionsToAdd);
        }, []);

        if (concatted.length === 0) return flattened.concat({ ...parentSong, category: null });

        return flattened.concat(
            concatted.map(version => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
                const categoryKey = version.category ? 'category' : 'gs_category';
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
                const categoryValue = version.category ? version.category : version.gs_category;
                return {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
                    media_id: version.media_id,
                    sId,
                    sNm,
                    aNm,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'version_name' does not exist on type 'ne... Remove this comment to see the full error message
                    version_name: version.version_name,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternate' does not exist on type 'never... Remove this comment to see the full error message
                    modified_date: version.modified_date,
                    alternate: version.alternate,
                    [categoryKey]: categoryValue,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
                    taaNum: metrics && metrics.enhanced ? metrics.enhanced.pop.num : null,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
                    packet_id: version.packet_id,
                    restriction_id: version.restriction_id,
                };
            })
        );
    }, []);

    return flattenedVersions;
};
