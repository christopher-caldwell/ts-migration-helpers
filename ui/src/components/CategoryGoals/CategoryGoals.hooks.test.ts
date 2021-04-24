import { renderHook } from '@testing-library/react-hooks';
import { useCategoryGoalsList } from './CategoryGoals.hooks';

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
    18: {
        id: 18,
        description: 'Sub Power',
        label: 'B',
        orderBy: 110,
        groupId: 1,
        group: 'CURRENT',
        readOnly: true,
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

const mockObjectEmpty = {};

describe('components/CategoryGoals/CategoryGoals.hooks', () => {
    it('should return category goals list sorted', () => {
        const {
            result: { current },
        } = renderHook(() => useCategoryGoalsList(mockAllCategories, mockStationCategories));
        expect(current.length).toBe(3);
        expect(current[0].label).toBe('A');
        expect(current[1].label).toBe('B');
        expect(current[2].label).toBe('01');
    });

    it('should return an empty list', () => {
        const {
            result: { current },
        } = renderHook(() => useCategoryGoalsList(mockObjectEmpty, mockStationCategories));
        expect(current.length).toBe(0);
    });
});
