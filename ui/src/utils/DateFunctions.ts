import moment from 'moment';

function getDiffInDays({
    startDate,
    endDate
}: any) {
    const end = moment.utc(endDate);
    const start = moment.utc(startDate);
    return end.diff(start, 'days') + 1;
}

function getDiffInDaysFromObj(obj: any) {
    const end = moment.utc(obj.endDate);
    const start = moment.utc(obj.startDate);
    return end.diff(start, 'days') + 1;
}

// Get the editable week (current week and current week -1)
function editableWeek(dateRange: any) {
    const currentDateMinusWeek = moment.utc().subtract(7, 'days');
    const editable = currentDateMinusWeek.isSameOrBefore(moment.utc(`${dateRange.endDate} 23:59:59`));
    return editable;
}

export { getDiffInDays, getDiffInDaysFromObj, editableWeek };
