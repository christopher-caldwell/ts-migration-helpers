import isNil from 'lodash/isNil';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import objectGet from 'utils/objectGet';

export const naturalSortCompare = (a, b) =>
    a.toString().localeCompare(b.toString(), undefined, { numeric: true });

export const defaultMTSort = (sortKey, a, b) => {
    const valueA = get(a, sortKey);
    const valueB = get(b, sortKey);
    if (valueA === null && valueB !== null) return -1;
    if (valueB === null && valueA !== null) return 1;
    if (valueA === null || valueB === null) return 0;
    return parseFloat(valueA) > parseFloat(valueB) ? 1 : -1;
};

export const getArrowSort = (sortKey, a, b) => {
    const order = {
        UP: 1,
        SU: 2,
        FL: 3,
        SD: 4,
        DN: 5,
    };
    const arrowA = a[sortKey].spins;
    const arrowB = b[sortKey].spins;

    if (arrowA === null && arrowB !== '-') return 1;
    if (arrowB === null && arrowA !== '-') return -1;
    return order[arrowB] - order[arrowA];
};

export const getSortedData = (sort, a, b) => {
    const valueA = a.valueStractor;
    const valueB = b.valueStractor;

    if (valueA === '-' && valueB !== '-') return 1;
    if (valueB === '-' && valueA !== '-') return -1;

    const result =
        typeof valueA === 'number' && typeof valueB === 'number'
            ? valueA - valueB
            : naturalSortCompare(valueA, valueB);

    return result * (sort.ascending ? 1 : -1);
};

export const getDefaultSortData = (sort, item) => {
    const tempItem = item;
    if (isNil(sort.sortValueExtractor)) {
        tempItem.valueStractor = objectGet(item, sort.key, '-').toString();
    } else if (!sort.sortValueExtractor(item)) {
        tempItem.valueStractor = '-';
    } else {
        tempItem.valueStractor = sort.sortValueExtractor(item);
    }

    return tempItem;
};

export const sortMessages = messages => {
    const messagePriorityNames = [null, 'High', 'Medium', 'Low'];
    const priorityNumber = message => messagePriorityNames.indexOf(message.priority);
    return messages
        .sort((a, b) => a.order - b.order) // sorting by order first
        .sort((messageA, messageB) => priorityNumber(messageA) - priorityNumber(messageB));
};

export const sortTeams = teams => {
    const disabledTeams = [];
    const enabledTeams = [];
    teams.forEach(team => {
        const hasRole = team.permissions.some(perm => perm.type === 'role');
        if (hasRole) return disabledTeams.push({ ...team, hasRole });
        return enabledTeams.push({ ...team, hasRole });
    });
    return [
        ...disabledTeams,
        ...enabledTeams.sort((teamA, teamB) => {
            const a = teamA.teamName.toLowerCase();
            const b = teamB.teamName.toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        }),
    ];
};

export const sortUsers = users =>
    users.sort((userA, userB) => {
        const a = userA.fullName.toLowerCase();
        const b = userB.fullName.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

export const getSortedCRG = (a, b) => {
    const order = { C: 1, R: 2, G: 3 };
    if (a.crg === null && b.crg !== null) return 1;
    if (b.crg === null && a.crg !== null) return -1;
    if (a.crg === null || b.crg === null) return 0;
    return order[a.crg] - order[b.crg];
};

const isMatchAvailable = (catChangeIDs, dataItm, sortKey) => {
    let resp = 999;
    if (sortKey.includes('category.staged')) {
        const merged = dataItm.category.staged || dataItm.category.current;
        if (merged && merged[0]) {
            let matchFound = false;
            if (!isEmpty(catChangeIDs)) {
                Object.values(catChangeIDs).forEach(item => {
                    if (item.media_id === merged[0].media_id) {
                        resp = item.order_by;
                        matchFound = true;
                    }
                });
                if (!matchFound) {
                    resp = merged[0].order_by || 1000;
                }
            } else {
                resp = merged[0].order_by || 1000;
            }
        }
        return resp;
    }

    return get(dataItm, `${sortKey}[0].order_by`, resp);
};

export const separateAndReverseMTData = (data, sortKey, ascending, catChangeIDs) => {
    if (sortKey === 'aNm' || sortKey === 'sNm') return ascending ? data : data.reverse();
    const goodData = [];
    const nullData = [];
    data.forEach(datum => {
        if (sortKey.includes('category')) {
            if (!(isMatchAvailable(catChangeIDs, datum, sortKey) === 999)) {
                goodData.push(datum);
            } else {
                nullData.push(datum);
            }
        } else if (sortKey.includes('competitor')) {
            if (!get(datum, sortKey)) {
                nullData.push(datum);
            } else {
                goodData.push(datum);
            }
        } else {
            const sortValue = get(datum.metrics, sortKey); // the value that is being used to sort
            if (!sortValue || (sortKey.includes('spins') && sortValue === 0)) {
                nullData.push(datum);
            } else {
                goodData.push(datum);
            }
        }
    });

    return ascending ? [...goodData, ...nullData] : [...goodData.reverse(), ...nullData];
};

export const dateSort = (sortKey, a, b) => {
    // a and b here are only the metrics object
    const valueA = get(a, sortKey);
    const valueB = get(b, sortKey);
    if (valueA === null && valueB !== null) return 1;
    if (valueB === null && valueA !== null) return -1;
    if (valueA === null || valueB === null) return 0;
    const utcDate = date => moment(date).utc().format('YYYYMMDD');

    return utcDate(valueA) - utcDate(valueB);
};

export const getNameSort = (sortKey, a, b, descending) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (descending) {
        return valueB.localeCompare(valueA.toString());
    }
    return valueA.localeCompare(valueB.toString(), undefined, {
        numeric: true,
        sensitivity: 'base',
    });
};

// Convert the category into a integer using the character ascii value, we need this to sort the songs when order_by
// is 900
const getCategoryValue = categoryItem =>
    (categoryItem.gs_category || '')
        .split('')
        .map(x => x.charCodeAt(0))
        .reduce((charA, chatB) => charA + chatB, 900);

export const getSortedCategory = (sortBy, a, b) => {
    try {
        const columnAName = sortBy.split('.')[1];
        const columnBName = sortBy.split('.')[1];

        if (
            a.category[columnAName] &&
            (!b.category[columnBName] || isEmpty(b.category[columnBName]))
        )
            return 1;
        if (
            (!a.category[columnAName] || isEmpty(a.category[columnAName])) &&
            b.category[columnBName]
        )
            return -1;
        if (!a.category[columnAName] && !b.category[columnBName]) return 0;
        if (isEmpty(a.category[columnAName]) && isEmpty(b.category[columnBName])) return 0;

        const catA =
            a.category[columnAName][0].order_by !== 900
                ? a.category[columnAName][0].order_by
                : getCategoryValue(a.category[columnAName][0]);
        const catB =
            b.category[columnBName][0].order_by !== 900
                ? b.category[columnBName][0].order_by
                : getCategoryValue(b.category[columnBName][0]);

        if (Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 0;
        if (Number.isNaN(parseInt(catA, 10)) && !Number.isNaN(parseInt(catB, 10))) return -1;
        if (!Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 1;
        return catB - catA;
    } catch (error) {
        console.error(error);
    }
};

export const getSortedRecommendedCategory = (a, b) => {
    const categoryA = a.category.recommended;
    const categoryB = b.category.recommended;

    if (categoryA && (!categoryB || isEmpty(categoryB))) return 1;
    if ((!categoryA || isEmpty(categoryA)) && categoryB) return -1;
    if (!categoryA && !categoryB) return 0;
    if (isEmpty(categoryA) && isEmpty(categoryB)) return 0;

    const catA =
        categoryA[0].order_by !== 900 ? categoryA[0].order_by : getCategoryValue(categoryA[0]);
    const catB =
        categoryB[0].order_by !== 900 ? categoryB[0].order_by : getCategoryValue(categoryB[0]);

    if (Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 0;
    if (Number.isNaN(parseInt(catA, 10)) && !Number.isNaN(parseInt(catB, 10))) return -1;
    if (!Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 1;

    if (catB !== catA) {
        return catB - catA;
    }
    const rankA = Object.values(categoryA)[0].rank;
    const rankB = Object.values(categoryB)[0].rank;
    return rankB - rankA;
};

export const getSortedStagedCategory = (sortBy, a, b, catChangeIDs) => {
    const aMerged = a.category.staged || a.category.current;
    const bMerged = b.category.staged || b.category.current;

    if (!isEmpty(aMerged) && isEmpty(bMerged)) return 1;
    if (isEmpty(aMerged) && !isEmpty(bMerged)) return -1;
    if (isEmpty(aMerged) && isEmpty(bMerged)) return 0;

    let aMatch;
    let bMatch;
    Object.values(catChangeIDs).forEach(item => {
        if (item.media_id === aMerged[0].media_id) {
            aMatch = item.order_by;
        }
        if (item.media_id === bMerged[0].media_id) {
            bMatch = item.order_by;
        }
    });

    const catA =
        (aMatch || aMerged[0].order_by) !== 900
            ? aMatch || aMerged[0].order_by
            : getCategoryValue(aMerged[0]);
    const catB =
        (bMatch || bMerged[0].order_by) !== 900
            ? bMatch || bMerged[0].order_by
            : getCategoryValue(bMerged[0]);

    if (Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 0;
    if (Number.isNaN(parseInt(catA, 10)) && !Number.isNaN(parseInt(catB, 10))) return -1;
    if (!Number.isNaN(parseInt(catA, 10)) && Number.isNaN(parseInt(catB, 10))) return 1;
    return catB - catA;
};

export const competitorSort = (valueA, valueB) => {
    if (!valueA && valueB) return 1;
    if (valueA && !valueB) return -1;
    if (!valueA && !valueB) return 0;
    return valueA - valueB;
};
