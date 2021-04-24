/**
 * Return an object given a dot-notation key.
 *
 * @param {Object} object
 * @param {string} key
 * @param {*}      defaultValue
 *
 * @returns {*}
 */
function objectGet(object, key, defaultValue = undefined) {
    if (!key) {
        return defaultValue;
    }
    const value = key.split('.').reduce((subValue, subKey) => {
        try {
            if (subValue === undefined || subValue === null) {
                return defaultValue;
            }

            if (subValue[subKey] === undefined || subValue[subKey] === null) {
                return defaultValue;
            }

            return subValue[subKey];
        } catch (e) {
            throw new Error(`Cannot resolve key '${key}'`);
        }
    }, object);

    // Return a default value if undefined
    if (!value && value !== 0 && defaultValue) {
        return defaultValue;
    }

    return value;
}

export default objectGet;
