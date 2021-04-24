export function isNumeric(n) {
    return n && !Number.isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(n) {
    return !Number.isNaN(n) && parseInt(Number(n), 10) === n && !Number.isNaN(parseInt(n, 10));
}

function addComma(n) {
    const parts = n.toString();
    return parts.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function addCommaToDecimal(n, decimals) {
    let parts = n.toString().split('.');

    // add decimals if required
    if (!parts[1] && decimals) {
        parts = n
            .toFixed(decimals)
            .toString()
            .split('.');
    }
    parts[0] = addComma(parts[0]);
    return parts.join('.');
}

/**
 * checks if the content is a number and if it is then apply comma on them and return the content.
 *
 * @param {String} content
 *
 * @returns {*}
 */
function getNumberWithComma(content, decimals) {
    if (isInt(content)) {
        return decimals ? addCommaToDecimal(content, decimals) : addComma(content);
    }
    if (isNumeric(content)) {
        return addCommaToDecimal(content);
    }
    return content;
}

export default getNumberWithComma;
