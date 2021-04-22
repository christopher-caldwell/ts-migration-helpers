import stringToObjectPath from 'utils/stringToObjectPath';

describe('stringToObjectPath.stringToObjectPath', () => {
    it('should return undefined', () => {
        const song = {
            test: 'test name',
        };
        expect(stringToObjectPath('key', song)).toBeUndefined();
    });
});
