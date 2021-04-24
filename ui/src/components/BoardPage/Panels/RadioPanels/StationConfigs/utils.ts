/**
 * Get Sync Status
 * @param {Boolean} synchronized Boolean that inform if the item is synchronized
 * @param {Boolean} staged that inform if the item is on stage
 * @returns {Object} Object containing Sync Status data
 */
const getSyncStatus = (synchronized, staged) => {
    if (synchronized && staged) {
        return {
            title: 'Pending Approval',
            message: `This item has been modified and requires approval before it can be synced with GSelector.`,
            status: 'waiting',
            type: 'info',
        };
    }
    if (synchronized) {
        return {
            title: 'Synchronized',
            message: 'This item has been successfully synced with GSelector.',
            status: 'synchronized',
            type: 'synced',
        };
    }
    return {
        title: 'Synchronizing',
        message: 'This item is being synchronized with GSelector, it will turn green eventually.',
        status: 'synchronizing',
        type: 'warning',
    };
};

export default getSyncStatus;
