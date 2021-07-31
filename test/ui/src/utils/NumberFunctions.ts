// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
export function isNumeric(n) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    return n && !Number.isNaN(parseFloat(n)) && isFinite(n);
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
function isInt(n) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'content' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
    return !Number.isNaN(n) && parseInt(Number(n), 10) === n && !Number.isNaN(parseInt(n, 10));
}

function addComma(n) {
    const parts = n.toString();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'content' implicitly has an 'any' type.
 * checks if the content is a number and if it is then apply comma on them and return the content.
 *
 * @param {String} content
 *
 * @returns {*}
 */
function getNumberWithComma(content, decimals) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (isInt(content)) {
        return decimals ? addCommaToDecimal(content, decimals) : addComma(content);
    }
    if (isNumeric(content)) {
        return addCommaToDecimal(content);
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return content;
}

export default getNumberWithComma;
