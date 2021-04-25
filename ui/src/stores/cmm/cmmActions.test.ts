import request from 'utils/request';
import {
    getOmtData,
    getCustomConsolidatedCalloutData,
    getCustomConsolidatedOmtData,
    getOmtTrends,
    getCustomConsolidatedCalloutTrends,
    getCustomConsolidatedOmtTrends,
} from './cmmActions';
import {
    OMT_PENDING,
    OMT_SUCCESS,
    OMT_FAILURE,
    CC_CALLOUT_PENDING,
    CC_CALLOUT_SUCCESS,
    CC_CALLOUT_FAILURE,
    CC_OMT_PENDING,
    CC_OMT_SUCCESS,
    CC_OMT_FAILURE,
    OMT_TRENDS_PENDING,
    OMT_TRENDS_SUCCESS,
    OMT_TRENDS_FAILURE,
    CC_CALLOUT_TRENDS_PENDING,
    CC_CALLOUT_TRENDS_SUCCESS,
    CC_CALLOUT_TRENDS_FAILURE,
    CC_OMT_TRENDS_PENDING,
    CC_OMT_TRENDS_SUCCESS,
    CC_OMT_TRENDS_FAILURE,
} from '../actionTypes';

jest.mock('utils/request', () => jest.fn());
const dispatch = jest.fn();

const cmmDataMock = {
    '84848035_0': {
        mediaId: null,
        songId: 84848035,
        popTotalRank: null,
        popTotal: null,
        twoPopTotal: null,
        ptlTotal: null,
        unfTotal: null,
        negTotal: null,
        ddlTotal: null,
        nopTotal: null,
        likTotal: null,
        favTotal: null,
        popTotalConsolidated1Rank: null,
        popTotalConsolidated1: null,
        popTotalConsolidated2Rank: null,
        popTotalConsolidated2: null,
        popTotalConsolidated3Rank: null,
        popTotalConsolidated3: null,
        popTotalPeak: 61,
        popTotalPeakDate: '2016-12-25',
        popCoreRank: null,
        popCore: null,
        twoPopCore: null,
        ptlCore: null,
        unfCore: null,
        negCore: null,
        ddlCore: null,
        nopCore: null,
        likCore: null,
        favCore: null,
        popHispanic: null,
        twoPopHispanic: null,
        ptlHispanic: null,
        popWhite: null,
        twoPopWhite: null,
        ptlWhite: null,
        popAsian: null,
        twoPopAsian: null,
        ptlAsian: null,
        popAa: null,
        twoPopAa: null,
        ptlAa: null,
        popAaHisp: null,
        twoPopAaHisp: null,
        ptlAaHisp: null,
        popMale: null,
        twoPopMale: null,
        ptlMale: null,
        popFemale: null,
        twoPopFemale: null,
        ptlFemale: null,
        popYoung: null,
        twoPopYoung: null,
        ptlYoung: null,
        popOld: null,
        twoPopOld: null,
        ptlOld: null,
    },
};

const trendsMock = {
    '10001_9999': {
        mediaId: 9999,
        songId: 10001,
        popTotalRank: [
            {
                date: 'string',
                value: 0,
            },
            {
                date: 'string',
                value: 1,
            },
        ],
        popTotal: [
            {
                date: 'string',
                value: 0,
                additionalProp1: {},
            },
        ],
    },
};

describe('cmm Actions', () => {
    beforeEach(() => {
        dispatch.mockReset();
    });

    describe('Callout data', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('call to research API with correct parameters should work', async () => {
            request.mockReturnValue(Promise.resolve());
            await getCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith(
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
                '/research/station/3323404/cmm?projectType=CALLOUT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_PENDING'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
        it('dispatch should be called with pending status', async () => {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_SUCCESS'.
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_PENDING'.
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_PENDING'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_FAILURE'.
            await getCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CALLOUT_PENDING });
        });

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_SUCCESS'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
        it('dispatch should be called with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(cmmDataMock));
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_SUCCESS'.
            await getCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_FAILURE'.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                type: CALLOUT_SUCCESS,
                payload: { ...cmmDataMock },
            });
        });

        it('dispatch should be called with failure status when fetch fails', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'getCalloutData'.
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CALLOUT_FAILURE'.
            await getCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CALLOUT_FAILURE,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                payload: { error: new Error('mission failed') },
            });
        });
    });

    describe('OMT data', () => {
        it('call to research API with correct parameters should work', async () => {
            request.mockReturnValue(Promise.resolve());
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm?projectType=OMT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with pending status', async () => {
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: OMT_PENDING });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(cmmDataMock));
            await getOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: OMT_SUCCESS,
                payload: { data: cmmDataMock },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with failure status when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: OMT_FAILURE,
                payload: { error: new Error('mission failed') },
            });
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    });

    describe('Custom Consolidated Callout data', () => {
        it('call to research API with correct parameters should work', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve());
            await getCustomConsolidatedCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm?' +
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                    'projectType=CUSTOM_CONSOLIDATED_CALLOUT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        it('dispatch should be called with pending status', async () => {
            request.mockReturnValue();
            await getCustomConsolidatedCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CC_CALLOUT_PENDING });
        });

        it('dispatch should be called with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(cmmDataMock));
            await getCustomConsolidatedCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                type: CC_CALLOUT_SUCCESS,
                payload: { ...{ data: cmmDataMock } },
            });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with failure status when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getCustomConsolidatedCalloutData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_CALLOUT_FAILURE,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                payload: { error: new Error('mission failed') },
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        });
    });

    describe('Custom Consolidated OMT data', () => {
        it('call to research API with correct parameters should work', async () => {
            request.mockReturnValue(Promise.resolve());
            await getCustomConsolidatedOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm?' +
                    'projectType=CUSTOM_CONSOLIDATED_OMT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        it('dispatch should be called with pending status', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCustomConsolidatedOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CC_OMT_PENDING });
        });

        it('dispatch should be called with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(cmmDataMock));
            await getCustomConsolidatedOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_OMT_SUCCESS,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                payload: { ...{ data: cmmDataMock } },
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        });

        it('dispatch should be called with failure status when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getCustomConsolidatedOmtData('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                type: CC_OMT_FAILURE,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                payload: { error: new Error('mission failed') },
            });
        });
    });

    describe('OMT trends', () => {
        it('calls cmm trends passing Omt, Start and End Date as parameter to endpoint', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve());
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm/trends?projectType=OMT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        it('dispatch trends pending', async () => {
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: OMT_TRENDS_PENDING });
        });

        it('dispatch trends success with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(trendsMock));
            await getOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: OMT_TRENDS_SUCCESS,
                payload: { ...{ data: trendsMock } },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            });
        });

        it('dispatch failure when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: OMT_TRENDS_FAILURE,
                payload: { error: new Error('mission failed') },
            });
        });
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    describe('Custom Consolidated Callout trends', () => {
        it('calls cmm trends passing Omt, Start and End Date as parameter to endpoint', async () => {
            request.mockReturnValue(Promise.resolve());
            await getCustomConsolidatedCalloutTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm/trends?' +
                    'projectType=CUSTOM_CONSOLIDATED_CALLOUT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        it('dispatch trends pending', async () => {
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCustomConsolidatedCalloutTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CC_CALLOUT_TRENDS_PENDING });
        });

        it('dispatch trends success with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(trendsMock));
            await getCustomConsolidatedCalloutTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_CALLOUT_TRENDS_SUCCESS,
                payload: { ...{ data: trendsMock } },
            });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch failure when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getCustomConsolidatedCalloutTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_CALLOUT_TRENDS_FAILURE,
                payload: { error: new Error('mission failed') },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            });
        });
    });

    describe('Custom Consolidated OMT trends', () => {
        it('calls cmm trends passing Omt, Start and End Date as parameter to endpoint', async () => {
            request.mockReturnValue(Promise.resolve());
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCustomConsolidatedOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(request).toHaveBeenCalledWith(
                '/research/station/3323404/cmm/trends?projectType=CUSTOM_CONSOLIDATED_OMT&startDate=2020-02-20&endDate=2020-02-27'
            );
        });

        it('dispatch trends with correct payload', async () => {
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCustomConsolidatedOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CC_OMT_TRENDS_PENDING });
        });

        it('dispatch trends with correct payload', async () => {
            request.mockReturnValue(Promise.resolve(trendsMock));
            await getCustomConsolidatedOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_OMT_TRENDS_SUCCESS,
                payload: { ...{ data: trendsMock } },
            });
        });

        it('dispatch failure when fetch fails', async () => {
            request.mockReturnValue(Promise.reject(new Error('mission failed')));
            await getCustomConsolidatedOmtTrends('3323404', '2020-02-20', '2020-02-27')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CC_OMT_TRENDS_FAILURE,
                payload: { error: new Error('mission failed') },
            });
        });
    });
});
