import objectGet from 'utils/objectGet';

const object = {
    terran: {
        heroes: {
            112: 'Raynor',
            113: 'Kerrigan',
        },
    },
    title: 'StarCraft',
};

describe('objectGet', () => {
    it('should expand a key\'s dot notation and traverse the object\'s path', () => {
        expect(objectGet(object, 'terran.heroes.112')).toBe('Raynor');
    });

    it('should resolve a single level key', () => {
        expect(objectGet(object, 'title')).toBe('StarCraft');
    });
});
