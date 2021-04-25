/**
 * Return an object given a dot-notation str.
 *
 * @param {Object} object
 * @param {string} str
 */
function stringToObjectPath(str: any, obj: any) {
    return str && str.split('.').reduce((o: any, i: any) => o[i], obj);
}

export default stringToObjectPath;
