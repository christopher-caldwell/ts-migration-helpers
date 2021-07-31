import isNil from 'lodash/isNil';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import objectGet from 'utils/objectGet';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
export const naturalSortCompare = (a, b) =>
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    a.toString().localeCompare(b.toString(), undefined, { numeric: true });

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
export const defaultMTSort = (sortKey, a, b) => {
    const valueA = get(a, sortKey);
    const valueB = get(b, sortKey);
    if (valueA === null && valueB !== null) return -1;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (valueB === null && valueA !== null) return 1;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (valueA === null || valueB === null) return 0;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sort' implicitly has an 'any' type.
    return parseFloat(valueA) > parseFloat(valueB) ? 1 : -1;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
export const getArrowSort = (sortKey, a, b) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sort' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'b' implicitly has an 'any' type.
    const order = {
        UP: 1,
        SU: 2,
        FL: 3,
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"-"' is not assignable to parame... Remove this comment to see the full error message
        SD: 4,
        DN: 5,
    };
    const arrowA = a[sortKey].spins;
    const arrowB = b[sortKey].spins;

    if (arrowA === null && arrowB !== '-') return 1;
    if (arrowB === null && arrowA !== '-') return -1;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messages' implicitly has an 'any' type.
    return order[arrowB] - order[arrowA];
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sort' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messageA' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"-"' is not assignable to parame... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7034) FIXME: Variable 'enabledTeams' implicitly has type 'any[]... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
export const getSortedData = (sort, a, b) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sort' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'disabledTeams' implicitly has an 'any[]'... Remove this comment to see the full error message
    const valueA = a.valueStractor;
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'enabledTeams' implicitly has an 'any[]' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messages' implicitly has an 'any' type.
    const valueB = b.valueStractor;

    if (valueA === '-' && valueB !== '-') return 1;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'users' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'userA' implicitly has an 'any' type.
    if (valueB === '-' && valueA !== '-') return -1;

    const result =
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        typeof valueA === 'number' && typeof valueB === 'number'
            ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
              valueA - valueB
            : // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messageA' implicitly has an 'any' type.
              naturalSortCompare(valueA, valueB);

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return result * (sort.ascending ? 1 : -1);
};

// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'teams' implicitly has an 'any' type.
export const getDefaultSortData = (sort, item) => {
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'disabledTeams' implicitly has type 'any[... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sort' implicitly has an 'any' type.
    const tempItem = item;
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
    if (isNil(sort.sortValueExtractor)) {
        tempItem.valueStractor = objectGet(item, sort.key, '-').toString();
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'disabledTeams' implicitly has an 'any[]'... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"-"' is not assignable to parame... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    } else if (!sort.sortValueExtractor(item)) {
        tempItem.valueStractor = '-';
    } else {
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'goodData' implicitly has type 'any[]' in... Remove this comment to see the full error message
        tempItem.valueStractor = sort.sortValueExtractor(item);
    }

    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'nullData' implicitly has type 'any[]' in... Remove this comment to see the full error message
    return tempItem;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'users' implicitly has an 'any' type.
export const sortMessages = messages => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'userA' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messages' implicitly has an 'any' type.
    const messagePriorityNames = [null, 'High', 'Medium', 'Low'];
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    const priorityNumber = message => messagePriorityNames.indexOf(message.priority);
    return messages
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'goodData' implicitly has an 'any[]' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        .sort((a, b) => a.order - b.order) // sorting by order first
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataItm' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'messageA' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
        .sort((messageA, messageB) => priorityNumber(messageA) - priorityNumber(messageB));
};

export const sortTeams = teams => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'teams' implicitly has an 'any' type.
    const disabledTeams = [];
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'disabledTeams' implicitly has type 'any[... Remove this comment to see the full error message
    const enabledTeams = [];
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryItem' implicitly has an 'any' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'enabledTeams' implicitly has type 'any[]... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
    teams.forEach(team => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'charA' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        const hasRole = team.permissions.some(perm => perm.type === 'role');
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catChangeIDs' implicitly has an 'any' t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'goodData' implicitly has type 'any[]' in... Remove this comment to see the full error message
        if (hasRole) return disabledTeams.push({ ...team, hasRole });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
        return enabledTeams.push({ ...team, hasRole });
    });
    return [
        ...disabledTeams,
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'disabledTeams' implicitly has an 'any[]'... Remove this comment to see the full error message
        ...enabledTeams.sort((teamA, teamB) => {
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'enabledTeams' implicitly has an 'any[]' ... Remove this comment to see the full error message
            const a = teamA.teamName.toLowerCase();
            const b = teamB.teamName.toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
            return 0;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'b' implicitly has an 'any' type.
        }),
    ];
};

export const sortUsers = users =>
    users.sort((userA, userB) => {
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'goodData' implicitly has an 'any[]' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'users' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'nullData' implicitly has an 'any[]' type... Remove this comment to see the full error message
        const a = userA.fullName.toLowerCase();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'userA' implicitly has an 'any' type.
        const b = userB.fullName.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
export const getSortedCRG = (a, b) => {
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const order = { C: 1, R: 2, G: 3 };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortBy' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    if (a.crg === null && b.crg !== null) return 1;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    if (b.crg === null && a.crg !== null) return -1;
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    if (a.crg === null || b.crg === null) return 0;
    return order[a.crg] - order[b.crg];
};

// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
const isMatchAvailable = (catChangeIDs, dataItm, sortKey) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryItem' implicitly has an 'any' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    let resp = 999;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'valueA' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catChangeIDs' implicitly has an 'any' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'valueB' implicitly has an 'any' type.
    if (sortKey.includes('category.staged')) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
        const merged = dataItm.category.staged || dataItm.category.current;
        if (merged && merged[0]) {
            let matchFound = false;
            if (!isEmpty(catChangeIDs)) {
                Object.values(catChangeIDs).forEach(item => {
                    if (item.media_id === merged[0].media_id) {
                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                        resp = item.order_by;
                        matchFound = true;
                    }
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    if (sortKey === 'aNm' || sortKey === 'sNm') return ascending ? data : data.reverse();
    const goodData = [];
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    const nullData = [];
    data.forEach(datum => {
        if (sortKey.includes('category')) {
            // @ts-expect-error ts-migrate(7034) FIXME: Variable 'goodData' implicitly has type 'any[]' in... Remove this comment to see the full error message
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
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                goodData.push(datum);
            }
        }
    });

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    return ascending ? [...goodData, ...nullData] : [...goodData.reverse(), ...nullData];
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortBy' implicitly has an 'any' type.
export const dateSort = (sortKey, a, b) => {
    // a and b here are only the metrics object
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'goodData' implicitly has an 'any[]' type... Remove this comment to see the full error message
    const valueA = get(a, sortKey);
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'nullData' implicitly has an 'any[]' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const valueB = get(b, sortKey);
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    if (valueA === null && valueB !== null) return 1;
    if (valueB === null && valueA !== null) return -1;
    if (valueA === null || valueB === null) return 0;
    const utcDate = date => moment(date).utc().format('YYYYMMDD');

    return utcDate(valueA) - utcDate(valueB);
};

export const getNameSort = (sortKey, a, b, descending) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (descending) {
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'valueA' implicitly has an 'any' type.
        return valueB.localeCompare(valueA.toString());
    }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryItem' implicitly has an 'any' t... Remove this comment to see the full error message
export const getSortedCategory = (sortBy, a, b) => {
    try {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
        const columnAName = sortBy.split('.')[1];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'charA' implicitly has an 'any' type.
        const columnBName = sortBy.split('.')[1];

        if (
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortBy' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
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

// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
export const getSortedStagedCategory = (sortBy, a, b, catChangeIDs) => {
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const aMerged = a.category.staged || a.category.current;
    const bMerged = b.category.staged || b.category.current;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortBy' implicitly has an 'any' type.
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

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const catA =
        (aMatch || aMerged[0].order_by) !== 900
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            ? aMatch || aMerged[0].order_by
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            : getCategoryValue(aMerged[0]);
    const catB =
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'valueA' implicitly has an 'any' type.
