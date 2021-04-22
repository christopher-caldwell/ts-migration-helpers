import isNil from 'lodash/isNil';
import valuesIn from 'lodash/valuesIn';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import unionBy from 'lodash/unionBy';
import reverse from 'lodash/reverse';
import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';
import stringToObjectPath from 'utils/stringToObjectPath';
import moment from 'moment';

const NONE = 'None';

// this method is called to build an obj with staged
// as first set items and then add the missing items from current
const pipe = (...fns) => subject => fns.reduce((acc, fn) => fn(acc), subject);

const mergePropsByField = field => arrys => unionBy(...arrys, field).filter(item => item);

// merge precedence is from left to right
const mergeAndReOrder = (field, ...arrys) => pipe(mergePropsByField(field), reverse)(arrys);

const areDayPartsEqual = dayPartCategories => {
    const AMD = dayPartCategories.get('AMD');
    return dayPartCategories.valueSeq().every(dayPart => dayPart === AMD);
};

function dayPartEmpty(dayPartCategories) {
    let isAllValuesNone = true;
    if (dayPartCategories) {
        if (dayPartCategories instanceof Object && 'get' in dayPartCategories) {
            const itemsSelected = dayPartCategories
                .valueSeq()
                .find(i => i && i.toString().toLowerCase() !== 'none');

            if (itemsSelected) {
                isAllValuesNone = itemsSelected.length === 0;
            }
        } else {
            isAllValuesNone =
                valuesIn(dayPartCategories).filter(i => i && i.toString().toLowerCase() !== 'none')
                    .length === 0;
        }
    }

    return isNil(dayPartCategories) || isAllValuesNone;
}

function dayPartUndefined(dayPartCategories) {
    let isDayPartUndefined = false;
    if (dayPartCategories) {
        if (dayPartCategories instanceof Object && 'get' in dayPartCategories) {
            const itemsSelected = dayPartCategories
                .valueSeq()
                .find(i => (i === undefined ? undefined : i));
            if (!itemsSelected) {
                isDayPartUndefined = true;
            }
        } else {
            const itemsSelected = valuesIn(dayPartCategories).filter(i =>
                i === undefined ? undefined : i
            );
            if (!itemsSelected) {
                isDayPartUndefined = true;
            }
        }
    }

    return isNil(dayPartCategories) || isDayPartUndefined;
}

const recommendedCategoryExtractor = (categories, primaryKey, backupKey) => {
    const defaultRecommended = {
        category: EMPTY_VALUE_PLACEHOLDER,
        rank: EMPTY_VALUE_PLACEHOLDER,
        overall_rank: EMPTY_VALUE_PLACEHOLDER,
    };

    let source = primaryKey;
    if (!categories || !categories[primaryKey] || !categories[primaryKey][0]) {
        if (!categories || !categories[backupKey] || !categories[backupKey][0]) {
            return defaultRecommended;
        }
        source = backupKey;
    }

    // this is in case stationcategory being poppulated from makecolumnmap
    // if user has changed the category since last save then
    // it will be part of staged so use that instead of new
    const changes = categories[source][0];
    if (changes) {
        return {
            category:
                (changes.category && changes.category.name) ||
                changes.gs_category ||
                EMPTY_VALUE_PLACEHOLDER,
            rank: changes.rank || EMPTY_VALUE_PLACEHOLDER,
            overall_rank: changes.overall_rank || EMPTY_VALUE_PLACEHOLDER,
        };
    }
    return defaultRecommended;
};

const categoryExtractor = (category, primaryKey, backupKey) => {
    const extract = {
        lastModifiedDate: '-',
        versionName: '-',
        category: '-',
    };

    let source = primaryKey;
    if (!category || !category[primaryKey] || !category[primaryKey][0]) {
        if (!category || !category[backupKey] || !category[backupKey][0]) {
            return extract;
        }
        source = backupKey;
    }

    const { staged, current } = category;
    let merged = staged || current;
    if (staged && current) {
        merged = mergeAndReOrder('media_id', staged, current);
    }

    const mediaId = merged && merged[0].media_id;

    // if user has changed the category since last save then
    // it will be part of staged so use that instead of new
    let changes = category[source][0];
    if (mediaId) {
        changes = category[source].find(item => item.media_id === mediaId);
    }

    let obj;
    if (changes) {
        obj = changes.category || {
            name: changes.gs_category || EMPTY_VALUE_PLACEHOLDER,
        };
        extract.lastModifiedDate =
            !isEmpty(changes.modified_date) &&
            `${moment(changes.modified_date).format('MM/DD/YY')}`;
        extract.versionName = !isEmpty(changes.version_name) && changes.version_name;
    } else {
        return extract;
    }

    extract.category = obj.name || EMPTY_VALUE_PLACEHOLDER;
    return extract;
};

const categoryTooltipExtractorByVersion = versionedCategory => {
    const extract = {
        lastModifiedDate: '',
        versionName: '-',
        category: '-',
    };

    if (!versionedCategory) {
        return extract;
    }

    extract.lastModifiedDate = !isEmpty(versionedCategory.modified_date)
        ? ` - ${moment(versionedCategory.modified_date).format('MM/DD/YY')}`
        : '-';
    extract.versionName =
        !isEmpty(versionedCategory.version_name) && `${versionedCategory.version_name}`;

    const obj = versionedCategory.category || {
        name: versionedCategory.gs_category || EMPTY_VALUE_PLACEHOLDER,
    };
    extract.category = obj.name || EMPTY_VALUE_PLACEHOLDER;
    return extract;
};

const categoryText = songObj => {
    if (typeof songObj === 'object' && (songObj.category || songObj.gs_category)) {
        const obj = songObj.category || {
            name: songObj.gs_category || EMPTY_VALUE_PLACEHOLDER,
        };
        return obj.name || EMPTY_VALUE_PLACEHOLDER;
    }
    return EMPTY_VALUE_PLACEHOLDER;
};

const categoryExtractorByVersion = version => {
    // this retrieves the gselector category when category name don't match with music lab
    const obj = version
        ? version.category || {
            name: version.gs_category || EMPTY_VALUE_PLACEHOLDER,
        }
        : {};
    const categories = obj.name || EMPTY_VALUE_PLACEHOLDER;
    return categories;
};

const getDaypartObject = groups => {
    if (typeof groups === 'object' && groups !== null) {
        const dayPartArray = ['AMD', 'MID', 'PMD', 'EVE', 'OVN'];
        return uniq(
            map(dayPartArray, item => {
                const name = get(groups[item], 'name', undefined);
                const id = get(groups[item], 'id', undefined);
                if (name && id) {
                    return { id, name };
                }
                return undefined;
            })
        ).filter(item => item);
    }
    return undefined;
};

const isEmptyColumn = (songs, columnKey) => {
    let emptyColumn = true;
    if (songs.length) {
        emptyColumn = isNil(songs.filter(song => stringToObjectPath(columnKey, song)));
    }

    return emptyColumn;
};

const crgSortExtractor = crgValue => {
    const sortOrder = ['C', 'R', 'G'];
    const sortValue = crgValue ? sortOrder.indexOf(crgValue.toUpperCase()) : -1;
    return sortValue !== -1 && sortValue + 1;
};

const isModifiedCategory = (category, versionsWithPacket) => {
    if (category && isEmpty(category.current) && !isEmpty(category.staged)) {
        // ^ if current does not carry a category but staged does then it is modify
        return true;
    }
    if (category && isEmpty(category.current) && isEmpty(category.staged)) {
        // ^ if current and staged does not have category then it is not modified
        return false;
    }
    if (category && !isEmpty(category.staged) && !isEmpty(category.current)) {
        // get the first item from staged and see if it was there in current
        // if yes check whether the modified date are different if so
        // return isModified as true
        const selectedVersion = Object.values(category.staged)[0].media_id;
        const matchedItem =
            selectedVersion &&
            Object.values(category.current).find(
                version => version && version.media_id === selectedVersion
            );
        if (category.staged[0] && matchedItem) {
            // there is no point in comparing current and staged
            // if the version just got selected
            // checking if this song has packet
            if (
                !matchedItem.modified_date ||
                versionsWithPacket.includes(category.staged[0].media_id)
            ) {
                return true;
            }
            const currentModifiedDate = moment.utc(matchedItem.modified_date);
            const stagedModifiedDate = moment.utc(category.staged[0].modified_date);
            return currentModifiedDate.diff(stagedModifiedDate, 'seconds') !== 0;
        }
        if (category.staged[0]) {
            // this means that this version of the song
            // is not there in the current week
            // but staged has it as a new song
            return true;
        }
    }

    return false;
};

/**
 * Define which group to use based on song having staged data or not
 * @param song {Object} Object containing song
 * @param song.category {Object} Object containing category data
 * @param song.category.staged {Array} Array containing staged category data
 */
const defineGroupToUse = song => {
    const noStagedData = !song.category.staged || !song.category.staged[0];
    return noStagedData ? 'current' : 'staged';
};

const hasCategory = (song, cat, usedGroup) => {
    if (!song.category[usedGroup] || !song.category[usedGroup][0]) return false;
    const { category } = song.category[usedGroup][0];
    if (isEmpty(category)) return false;

    return category.name === cat.label;
};

/**
 * Define if song is in any of the selected filters
 * @param song {Object} Object containing song
 * @param song.category {Object} Object containing category data
 * @param song.category.prior {Array} Array containing staged category data
 * @param song.category.current {Array} Array containing staged category data
 * @param song.category.staged {Array} Array containing staged category data
 * @param filter {Object} Object containing filters
 * @param filter.prior {Object} Object containing prior category filters
 * @param filter.current {Object} Object containing current category filters
 * @param filter.new {Object} Object containing new category filters
 * @param filter.recommendable {Object} Object containing recommendable category filters
 */
const isSongInsideCategory = (song, filter) => {
    const {
        category: { prior, current, new: staged, recommendable },
    } = filter;

    const isPriorNoneSelected = prior.some(cat => cat.label === 'None');
    const shouldFilterPrior =
        !isEmpty(prior) && isEmpty(get(song, 'category.prior[0].category', null));
    const isInPrior = prior.some(cat => hasCategory(song, cat, 'prior'))
        ? true
        : isPriorNoneSelected && shouldFilterPrior;

    const isCurrentNoneSelected = current.some(cat => cat.label === 'None');
    const shouldFilterCurrent =
        !isEmpty(current) && isEmpty(get(song, 'category.current[0].category', null));
    const isInCurrent = current.some(cat => hasCategory(song, cat, 'current'))
        ? true
        : isCurrentNoneSelected && shouldFilterCurrent;

    const isStagedNoneSelected = staged.some(cat => cat.label === 'None');
    const stagedGroup = defineGroupToUse(song);
    const shouldFilterStaged =
        !isEmpty(staged) && isEmpty(get(song, `category.${stagedGroup}[0].category`, null));
    const isInStaged = staged.some(cat => hasCategory(song, cat, stagedGroup))
        ? true
        : isStagedNoneSelected && shouldFilterStaged;

    const isRecommendableNoneSelected = recommendable.some(cat => cat.label === 'None');
    const shouldFilterRecommendable =
        !isEmpty(recommendable) && isEmpty(get(song, `category.recommended[0].category`, null));
    const isInRecommendable = recommendable.some(cat => hasCategory(song, cat, 'recommended'))
        ? true
        : isRecommendableNoneSelected && shouldFilterRecommendable;

    return isInPrior || isInCurrent || isInStaged || isInRecommendable;
};

/**
 * Peforms a search based on certain criteria and changes Redux state
 * @param searchParam {Object} Object containing criteria
 * @param searchParam.search {String} Criteria to filter song.artist || artist.title
 * @param searchParam.crg {Array[String]} List of CRG to be filtered
 * @param searchParam.category.prior {Array[String]} Prior letters to be filtered
 * @param searchParam.category.current {Array[String]} Current letters to be filtered
 * @param searchParam.category.new {Array[String]} New letters to be filtered
 */
const filterMusicTracker = searchFilter => {
    /**
     * Filter a song by a certain category or set of category
     * @param filterCategoryName (String) Filter category that should be considered while filtering
     * @param categoryNameCriteria (String) The category by which the song should be filtered
     * @param fallbackCategoryNameCriteria (String) Fallback by which the song should be filtered
     * @returns A boolean indicating if song meets the criteria
     */
    /* Search criteria */
    // Scape special characters. Ex.: \(, \{
    const scapeSearch = searchFilter.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(scapeSearch, 'gi');

    const filterMusicTrackerCriteria = song => {
        const isSongInsideSearchCriteria = searchFilter.search
            ? !!song.metadata.aNm.match(regex) || !!song.metadata.sNm.match(regex)
            : true;

        // when crg value is empty it should not be treated as search filter
        const isSongInsideCrgCriteria = song.metrics.crg
            ? searchFilter.crg.includes(song.metrics.crg)
            : true;

        return (
            isSongInsideSearchCriteria &&
            isSongInsideCrgCriteria &&
            !isSongInsideCategory(song, searchFilter)
        );
    };

    return filterMusicTrackerCriteria;
};

const versionTextExtractor = (dayPartCategories, primaryKey, backupKey) => {
    let merged = dayPartCategories[primaryKey] || dayPartCategories[backupKey];
    if (dayPartCategories[primaryKey] && dayPartCategories[backupKey]) {
        merged = mergeAndReOrder(
            'media_id',
            dayPartCategories[primaryKey],
            dayPartCategories[backupKey]
        );
    }

    const versionDetails =
        merged &&
        merged.map(item => {
            const prior =
                dayPartCategories.prior &&
                dayPartCategories.prior.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            const priorList = prior && prior.filter(itm => itm);

            const current =
                dayPartCategories.current &&
                dayPartCategories.current.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            const currentList = current && current.filter(itm => itm);

            const staged =
                merged &&
                merged.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            const stagedList = staged && staged.filter(itm => itm);

            const final = {
                mediaId: item.media_id,
                versionName: item.version_name,
                category: {
                    prior: priorList,
                    current: currentList,
                    staged: stagedList || currentList,
                },
            };
            return final;
        });

    return versionDetails;
};

// this works in case that we have all daypart with same category
const getCategoryId = category => (isEmpty(category) ? NONE : category.id);

const getSongVersion = song => {
    let merged = song.category.staged || song.category.current || [song];
    if (song.category.staged && song.category.current) {
        merged = mergeAndReOrder('media_id', song.category.staged, song.category.current);
    }
    return merged;
};

const formatSong = song => {
    const songVersion = getSongVersion(song);

    return songVersion.map(sng => ({
        ...song,
        ...sng,
        categoryId: sng.category && sng.category.id,
    }));
};

const flatVersions = statusVersions => {
    if (statusVersions) {
        return Object.entries(statusVersions).reduce((flattened, item) => {
            const songId = item[0]; // sId
            const versions = item[1].map(song => ({ sId: songId, ...song })); // versions array
            return flattened.concat(versions);
        }, []);
    }
    return [];
};

export default {
    pipe,
    versionTextExtractor,
    recommendedCategoryExtractor,
    categoryExtractor,
    categoryTooltipExtractorByVersion,
    categoryExtractorByVersion,
    categoryText,
    getDaypartObject,
    areDayPartsEqual,
    isEmptyColumn,
    crgSortExtractor,
    dayPartEmpty,
    mergeAndReOrder,
    dayPartUndefined,
    isModifiedCategory,
    filterMusicTracker,
    getCategoryId,
    isSongInsideCategory,
    getSongVersion,
    formatSong,
    flatVersions,
};
