/**
 * Get all assigned slots
 * @param {Array} dayparts Array containing dayparts
 * @returns {Array} Array of all assined slots
 */
export const getAllAssignedSlots = (dayparts: any) => {
    let allSlots: any = [];
    dayparts.forEach((daypart: any) => {
        allSlots = allSlots.concat(daypart.hours);
    });
    return allSlots;
};

/**
 * Get dayparts with changes
 * @param {Array} dayparts Array containing dayparts
 * @param {Array} stagedDayparts Array containing staged dayparts
 * @returns {Array} Array of dayparts updated
 */
export const daypartsWithChanges = (dayparts: any, stagedDayparts: any) => dayparts.reduce((combined: any, daypart: any) => {
    const stagedDaypart = stagedDayparts.find((d: any) => d.id === daypart.id);
    return [...combined, stagedDaypart || daypart];
}, []);

/**
 * Check if we have all assignment slots filled
 * @param {Array} dayparts Array containing dayparts
 * @param {Array} stagedDayparts Array containing staged dayparts
 * @returns {Boolean}
 */
export const hasAllSlotsFilled = (dayparts: any, stagedDayparts: any) => {
    const assignedSlots = getAllAssignedSlots(daypartsWithChanges(dayparts, stagedDayparts));

    return assignedSlots.length === 168;
};
