const keyToType = {
    radio: 'RadioBoard',
    admin: 'AdminBoard',
};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
function caseInsensitiveKeyToType(key) {
    const caseInsensitiveKey = key.toLowerCase();
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
    return keyToType[caseInsensitiveKey];
}
const typeToKey = {};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
Object.keys(keyToType).forEach(type => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    typeToKey[keyToType[type]] = type;
});

const BoardType = {
    toType: key => caseInsensitiveKeyToType(key),
    toKey: board => typeToKey[board],
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
};

export default BoardType;
