import escapeRegexCharacters from 'utils/escapeRegexCharacters';

describe('escapeRegexCharacters.escapeRegexCharacters', () => {
    it('should remove special characters', () => {
        expect(escapeRegexCharacters('abc$abc')).toBe('abc\\$abc');
    });
});
