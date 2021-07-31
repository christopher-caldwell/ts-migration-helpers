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
// @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'fns' implicitly has an 'any[]' typ... Remove this comment to see the full error message
const pipe = (...fns) => subject => fns.reduce((acc, fn) => fn(acc), subject);

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
const mergePropsByField = field => arrys => unionBy(...arrys, field).filter(item => item);

// merge precedence is from left to right
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'field' implicitly has an 'any' type.
const mergeAndReOrder = (field, ...arrys) => pipe(mergePropsByField(field), reverse)(arrys);

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
const areDayPartsEqual = dayPartCategories => {
    const AMD = dayPartCategories.get('AMD');
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPart' implicitly has an 'any' type.
    return dayPartCategories.valueSeq().every(dayPart => dayPart === AMD);
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
function dayPartEmpty(dayPartCategories) {
    let isAllValuesNone = true;
    if (dayPartCategories) {
        if (dayPartCategories instanceof Object && 'get' in dayPartCategories) {
            const itemsSelected = dayPartCategories
                .valueSeq()
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
function dayPartUndefined(dayPartCategories) {
    let isDayPartUndefined = false;
    if (dayPartCategories) {
        if (dayPartCategories instanceof Object && 'get' in dayPartCategories) {
            const itemsSelected = dayPartCategories
                .valueSeq()
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categories' implicitly has an 'any' typ... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        changes = category[source].find(item => item.media_id === mediaId);
    }

    let obj;
    if (changes) {
        obj = changes.category || {
            name: changes.gs_category || EMPTY_VALUE_PLACEHOLDER,
        };
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | false' is not assignable to type 's... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'versionedCategory' implicitly has an 'a... Remove this comment to see the full error message
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
        ?          ` - ${moment(versionedCategory.modified_date).format('MM/DD/YY')}`
        : '-';
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | false' is not assignable to type 's... Remove this comment to see the full error message
    extract.versionName =
        !isEmpty(versionedCategory.version_name) && `${versionedCategory.version_name}`;

    const obj = versionedCategory.category || {
        name: versionedCategory.gs_category || EMPTY_VALUE_PLACEHOLDER,
    };
    extract.category = obj.name || EMPTY_VALUE_PLACEHOLDER;
    return extract;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songObj' implicitly has an 'any' type.
const categoryText = songObj => {
    if (typeof songObj === 'object' && (songObj.category || songObj.gs_category)) {
        const obj = songObj.category || {
            name: songObj.gs_category || EMPTY_VALUE_PLACEHOLDER,
        };
        return obj.name || EMPTY_VALUE_PLACEHOLDER;
    }
    return EMPTY_VALUE_PLACEHOLDER;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'version' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
const isEmptyColumn = (songs, columnKey) => {
    let emptyColumn = true;
    if (songs.length) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        emptyColumn = isNil(songs.filter(song => stringToObjectPath(columnKey, song)));
    }

    return emptyColumn;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'crgValue' implicitly has an 'any' type.
const crgSortExtractor = crgValue => {
    const sortOrder = ['C', 'R', 'G'];
    const sortValue = crgValue ? sortOrder.indexOf(crgValue.toUpperCase()) : -1;
    return sortValue !== -1 && sortValue + 1;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const selectedVersion = Object.values(category.staged)[0].media_id;
        const matchedItem =
            selectedVersion &&
            Object.values(category.current).find(
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
const defineGroupToUse = song => {
    const noStagedData = !song.category.staged || !song.category.staged[0];
    return noStagedData ? 'current' : 'staged';
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
const hasCategory = (song, cat, usedGroup) => {
    if (!song.category[usedGroup] || !song.category[usedGroup][0]) return false;
    const { category } = song.category[usedGroup][0];
    if (isEmpty(category)) return false;

    return category.name === cat.label;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
const isSongInsideCategory = (song, filter) => {
    const {
        category: { prior, current, new: staged, recommendable },
    } = filter;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isPriorNoneSelected = prior.some(cat => cat.label === 'None');
    const shouldFilterPrior =
        !isEmpty(prior) && isEmpty(get(song, 'category.prior[0].category', null));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isInPrior = prior.some(cat => hasCategory(song, cat, 'prior'))
        ? true
        : isPriorNoneSelected && shouldFilterPrior;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isCurrentNoneSelected = current.some(cat => cat.label === 'None');
    const shouldFilterCurrent =
        !isEmpty(current) && isEmpty(get(song, 'category.current[0].category', null));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isInCurrent = current.some(cat => hasCategory(song, cat, 'current'))
        ? true
        : isCurrentNoneSelected && shouldFilterCurrent;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isStagedNoneSelected = staged.some(cat => cat.label === 'None');
    const stagedGroup = defineGroupToUse(song);
    const shouldFilterStaged =
        !isEmpty(staged) && isEmpty(get(song, `category.${stagedGroup}[0].category`, null));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isInStaged = staged.some(cat => hasCategory(song, cat, stagedGroup))
        ? true
        : isStagedNoneSelected && shouldFilterStaged;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isRecommendableNoneSelected = recommendable.some(cat => cat.label === 'None');
    const shouldFilterRecommendable =
        !isEmpty(recommendable) && isEmpty(get(song, `category.recommended[0].category`, null));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
    const isInRecommendable = recommendable.some(cat => hasCategory(song, cat, 'recommended'))
        ? true
        : isRecommendableNoneSelected && shouldFilterRecommendable;

    return isInPrior || isInCurrent || isInStaged || isInRecommendable;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchFilter' implicitly has an 'any' t... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dayPartCategories' implicitly has an 'a... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        merged.map(item => {
            const prior =
                dayPartCategories.prior &&
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
                dayPartCategories.prior.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'itm' implicitly has an 'any' type.
            const priorList = prior && prior.filter(itm => itm);

            const current =
                dayPartCategories.current &&
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
                dayPartCategories.current.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'itm' implicitly has an 'any' type.
            const currentList = current && current.filter(itm => itm);

            const staged =
                merged &&
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
                merged.map(entry => {
                    if (entry && entry.media_id === item.media_id) {
                        const obj = entry.category || {
                            name: entry.gs_category || EMPTY_VALUE_PLACEHOLDER,
                        };
                        return obj.name || EMPTY_VALUE_PLACEHOLDER;
                    }
                    return undefined;
                });
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'itm' implicitly has an 'any' type.
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
const getCategoryId = category => (isEmpty(category) ? NONE : category.id);

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
const getSongVersion = song => {
    let merged = song.category.staged || song.category.current || [song];
    if (song.category.staged && song.category.current) {
        merged = mergeAndReOrder('media_id', song.category.staged, song.category.current);
    }
    return merged;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
const formatSong = song => {
    const songVersion = getSongVersion(song);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sng' implicitly has an 'any' type.
    return songVersion.map(sng => ({
        ...song,
        ...sng,
        categoryId: sng.category && sng.category.id,
    }));
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'statusVersions' implicitly has an 'any'... Remove this comment to see the full error message
const flatVersions = statusVersions => {
    if (statusVersions) {
        return Object.entries(statusVersions).reduce((flattened, item) => {
            const songId = item[0]; // sId
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
