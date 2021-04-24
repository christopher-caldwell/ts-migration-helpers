import uniq from 'lodash/uniq';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';

export const getFlattenedVersions = (songs, songVersions) => {
    const versionData = songVersions.data;
    const invertedData = {};
    Object.keys(versionData.current || {}).forEach(songId => {
        invertedData[songId] = {
            ...invertedData[songId],
            current: songVersions.data.current[songId],
        };
    });
    Object.keys(versionData.prior || {}).forEach(songId => {
        invertedData[songId] = {
            ...invertedData[songId],
            prior: songVersions.data.prior[songId],
        };
    });
    Object.keys(versionData.staged || {}).forEach(songId => {
        invertedData[songId] = {
            ...invertedData[songId],
            staged: songVersions.data.staged[songId],
        };
    });
    Object.keys(versionData.recommended || {}).forEach(songId => {
        invertedData[songId] = {
            ...invertedData[songId],
            recommended: songVersions.data.recommended[songId],
        };
    });

    const musicTrackerSongIds = songs.data.map(song => song.sId);
    const gselectorSongIds = Object.keys(invertedData).map(item => parseInt(item, 10));
    const mergedSongIds = [...gselectorSongIds, ...musicTrackerSongIds];
    const ddedup = uniq(mergedSongIds);
    const songsWithVersions = ddedup.map(songId => {
        const song = songs.data.find(s => (s && s.sId ? s.sId.toString() === songId.toString() : false));

        const categories = invertedData[songId] || {
            staged: null,
            current: null,
        };
        if (song) return { ...song, category: categories };
        const version = utils.mergeAndReOrder('media_id', categories.staged, categories.current)[0];
        if (version) {
            return {
                ...song,
                sId: parseInt(songId, 10),
                metadata: { aNm: version.aNm, sNm: version.sNm },
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
            const versionsToAdd = versions.filter(v => !consolidated.find(c => c.media_id === v.media_id));

            return consolidated.concat(versionsToAdd);
        }, []);

        if (concatted.length === 0) return flattened.concat({ ...parentSong, category: null });

        return flattened.concat(
            concatted.map(version => {
                const categoryKey = version.category ? 'category' : 'gs_category';
                const categoryValue = version.category ? version.category : version.gs_category;
                return {
                    media_id: version.media_id,
                    sId,
                    sNm,
                    aNm,
                    version_name: version.version_name,
                    modified_date: version.modified_date,
                    alternate: version.alternate,
                    [categoryKey]: categoryValue,
                    taaNum: metrics && metrics.enhanced ? metrics.enhanced.pop.num : null,
                    packet_id: version.packet_id,
                    restriction_id: version.restriction_id,
                };
            })
        );
    }, []);

    return flattenedVersions;
};
