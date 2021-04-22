import getSyncStatus from 'components/BoardPage/Panels/RadioPanels/StationConfigs/utils.js';

describe('components/BoardPage/Panels/RadioPanels/StationConfigs/utils.js', () => {
    describe('getSyncStatus', () => {
        it('should return pending approval status', () => {
            const result = getSyncStatus(true, true);
            expect(result.title).toEqual('Pending Approval');
            expect(result.status).toEqual('waiting');
            expect(result.type).toEqual('info');
        });

        it('should return synchronized status', () => {
            const result = getSyncStatus(true, false);
            expect(result.title).toEqual('Synchronized');
            expect(result.status).toEqual('synchronized');
            expect(result.type).toEqual('info');
        });

        it('should return synchronizing status', () => {
            const result = getSyncStatus(false, false);
            expect(result.title).toEqual('Synchronizing');
            expect(result.status).toEqual('synchronizing');
            expect(result.type).toEqual('info');
        });
    });
});
