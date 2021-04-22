const keyToType = {
    radio: 'RadioBoard',
    admin: 'AdminBoard',
};
function caseInsensitiveKeyToType(key) {
    const caseInsensitiveKey = key.toLowerCase();
    return keyToType[caseInsensitiveKey];
}
const typeToKey = {};

Object.keys(keyToType).forEach(type => {
    typeToKey[keyToType[type]] = type;
});

const BoardType = {
    toType: key => caseInsensitiveKeyToType(key),
    toKey: board => typeToKey[board],
};

export default BoardType;
