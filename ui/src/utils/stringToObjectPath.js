/**
 * Return an object given a dot-notation str.
 *
 * @param {Object} object
 * @param {string} str
 */
function stringToObjectPath(str, obj) {
    return str && str.split('.').reduce((o, i) => o[i], obj);
}

export default stringToObjectPath;
