import { makeColorRange, defaultRange } from 'utils/colors';

const isHex = (hex: any) => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(hex);

describe('colors.makeColorRange', () => {
    it('should create a range given an array of colors', () => {
        const colorRange = makeColorRange(['#333', '#555']);

        expect(colorRange(0)).toBe('#333');
        expect(colorRange(1)).toBe('#555');
    });

    it('should rotate the color when the index is greater than the number of possible colors', () => {
        const colorRange = makeColorRange(['#300', '#505']);

        expect(colorRange(2)).toBe('#331a00');
    });
});

describe('colors.defaultRange', () => {
    it('should return a valid hex code', () => {
        expect(isHex(defaultRange(0))).toBe(true);
        expect(isHex(defaultRange(4))).toBe(true);
    });

    it('should return different hex colors across the initial indexes', () => {
        const color1 = defaultRange(0);
        const color2 = defaultRange(1);

        expect(color1).not.toBe(color2);
    });
});
