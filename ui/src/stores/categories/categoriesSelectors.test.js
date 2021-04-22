import { getRawStationCategories } from 'stores/categories/categoriesSelectors';

const mockAllCategories = {
    1: {
        id: 1,
        description: '00s Power',
        label: '01',
        orderBy: 350,
        groupId: 4,
        group: '1990a - 2010s',
        readOnly: false,
    },
    17: {
        id: 17,
        description: 'Power',
        label: 'A',
        orderBy: 100,
        groupId: 1,
        group: 'CURRENT',
        readOnly: false,
    },
    18: {
        id: 18,
        description: 'Sub Power',
        label: 'B',
        orderBy: 110,
        groupId: 1,
        group: 'CURRENT',
        readOnly: true,
    },
};
const mockStationCategories = {
    17: {
        active: true,
        limit: 4,
    },
    18: {
        active: true,
        limit: null,
    },
};

describe('stores/categories/categoriesSelectors', () => {
    it('should return raw station categories', () => {
        const result = getRawStationCategories(mockAllCategories, mockStationCategories);
        expect(result.length).toBe(2);
    });
});
