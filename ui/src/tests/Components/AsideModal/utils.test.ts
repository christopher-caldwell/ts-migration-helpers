import {
    getAllAssignedSlots,
    daypartsWithChanges,
    hasAllSlotsFilled,
} from 'components/AsideModal/utils';

const mockDayparts = [
    {
        id: 1,
        name: 'Daypart 1',
        synchronized: true,
        scheduling_order: 1,
        hours: [0, 1, 2, 8, 9],
    },
    {
        id: 2,
        name: 'Daypart 2',
        synchronized: true,
        scheduling_order: 2,
        hours: [99, 100, 101, 107, 108, 109],
    },
    {
        id: 3,
        name: 'Daypart 3',
        synchronized: false,
        scheduling_order: 3,
        hours: [],
    },
];

const mockStagedDayparts = [
    {
        id: 1,
        name: 'Daypart 1',
        hours: [0, 1, 2, 8, 9, 20, 21, 22, 23],
    },
];

describe('components/AsideModal/utils', () => {
    it('should return all assigned slots', () => {
        const result = getAllAssignedSlots(mockDayparts);
        expect(result).toEqual([0, 1, 2, 8, 9, 99, 100, 101, 107, 108, 109]);
    });

    it('should return all dayparts with changes', () => {
        const result = daypartsWithChanges(mockDayparts, mockStagedDayparts);
        expect(result[0].hours).toEqual([0, 1, 2, 8, 9, 20, 21, 22, 23]);
    });

    it('should return true when all slots are filled', () => {
        const mockStagedDaypartsTest = [
            {
                id: 3,
                name: 'Daypart 3',
                hours: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
                    45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
                    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
                    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 102, 103, 104, 105, 106,
                    110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125,
                    126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141,
                    142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
                    158, 159, 160, 161, 162, 163, 164, 165, 166, 167],
            },
        ];
        const result = hasAllSlotsFilled(mockDayparts, mockStagedDaypartsTest);
        expect(result).toBeTruthy();
    });

    it('should return false when all slots are NOT filled', () => {
        const result = hasAllSlotsFilled(mockDayparts, mockStagedDayparts);
        expect(result).toBeFalsy();
    });
});
