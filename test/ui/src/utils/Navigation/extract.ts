/**
 * extractHash
 *
 * Takes the hash of the window and returns only the string. Remove the "#".
 *
 * @param {string} hashParam
 * @return {string}
 */
const extractHash = (hashParam = null) => {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hashParam' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (!hashParam.length) {
        return '';
    }

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return hashParam.substr(1);
};

/**
 * extractAction
 *
 * Takes the hash of the window and returns the Action.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hashParam' implicitly has an 'any' type... Remove this comment to see the full error message
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hashParam' implicitly has an 'any' type... Remove this comment to see the full error message
 *  Url has to be built like this: #musictracker/category
 *  open-category -> is action.
 *
 * @param {string} hashParam
 * @return {string}
 */
const extractAction = (hashParam, extractHashFlag = true) => {
    const hash = extractHashFlag ? extractHash(hashParam) : hashParam;
    const hashArray = hash.split('/');

    if (!Array.isArray(hashArray) || hashArray.length < 2) {
        return '';
    }

    return hashArray[1];
};

/**
 * extractTab
 *
 * Takes the hash of the window and returns the Tab.
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hashParam' implicitly has an 'any' type... Remove this comment to see the full error message
 *  Url has to be built like this: #musictracker/category
 *  musictracker -> is Tab.
 *
 * @param {string} hashParam
 * @return {string}
 */
const extractTab = (hashParam, extractHashFlag = true) => {
    const hash = extractHashFlag ? extractHash(hashParam) : hashParam;
    const hashArray = hash.split('/');

    if (!Array.isArray(hashArray) || hashArray.length < 1) {
        return '';
    }

    return hashArray[0];
};

export { extractTab, extractAction, extractHash };
