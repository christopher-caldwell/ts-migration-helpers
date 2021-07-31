import abbreviateNumber from 'utils/abbreviateNumber';

describe('abbreviateNumber', () => {
    it('should abbreviate a number that crosses a breakpoint', () => {
        expect(abbreviateNumber(203000000)).toBe('203M');
    });

    it('should round to one decimal place when abbreviating', () => {
        expect(abbreviateNumber(2060)).toBe('2.1K');
    });

    it('should return the same number when no breakpoint is crossed', () => {
        expect(abbreviateNumber(213)).toBe(213);
    });
});
