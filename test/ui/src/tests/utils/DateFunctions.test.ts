import moment from 'moment';

import { getDiffInDays, getDiffInDaysFromObj, editableWeek } from 'utils/DateFunctions';

describe('DateFunctions.getDiffInDays', () => {
    it('should get difference in days of given dates', () => {
        const startDate = moment('02-20-2019', 'MM-DD-YYYY');
        const endDate = moment('02-25-2019', 'MM-DD-YYYY');
        expect(getDiffInDays({ startDate, endDate })).toBe(6);
    });
});

describe('DateFunctions.getDiffInDaysFromObj', () => {
    it('should get difference in days of given dates from object', () => {
        const startDate = moment('02-20-2019', 'MM-DD-YYYY');
        const endDate = moment('02-25-2019', 'MM-DD-YYYY');
        expect(getDiffInDaysFromObj({ startDate, endDate })).toBe(6);
    });
});

describe('DateFunctions.editableWeek', () => {
    it('should get the editable week', () => {
        const startDate = moment();
        const endDate = moment();
        expect(editableWeek({ startDate, endDate })).toBe(false);
    });
});
