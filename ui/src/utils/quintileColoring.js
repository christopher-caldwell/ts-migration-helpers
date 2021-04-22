const resolveQuintile = dataValue => {
    let quintile = 5;
    const quintileRange = [
        [85, Infinity],
        [78, 84],
        [72, 77],
        [65, 71],
    ];
    const value = Math.floor(dataValue);

    quintileRange.forEach((range, index) => {
        if (value >= range[0] && value <= range[1]) {
            quintile = index + 1;
        }
    });

    return quintile;
};

const getQuintileColor = (value, alreadyQuintileNum = false) => {
    const quintileNumber = alreadyQuintileNum ? value : resolveQuintile(value);
    switch (quintileNumber) {
        case 1:
            return '#00af23';
        case 2:
            return '#0ca9aa';
        case 3:
            return '#b8d02c';
        case 4:
            return '#ff8a0d';
        case 5:
            return '#ba384a';
        default:
            return '#ddd';
    }
};

export { resolveQuintile, getQuintileColor };
