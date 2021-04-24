import reducer from './customConsolidatedCalloutReducer';
import { CC_CALLOUT_PENDING, CC_CALLOUT_SUCCESS, CC_CALLOUT_FAILURE } from '../actionTypes';

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

describe('CMM Reducer', () => {
    describe('Custom Consolidated Callout', () => {
        const initialState = {
            loading: false,
            error: null,
            data: {},
        };

        it('set initial state when no data is passed', async () => {
            const state = reducer(undefined, {});
            expect(state).toEqual({ ...initialState });
        });

        it('set state as loading when action type is CC_CALLOUT_PENDING', async () => {
            const state = reducer(initialState, { type: CC_CALLOUT_PENDING });
            expect(state).toEqual({ ...initialState, loading: true });
        });

        it('set state with payload when action type is CC_CALLOUT_SUCCESS', async () => {
            const state = reducer(initialState, {
                type: CC_CALLOUT_SUCCESS,
                payload: { data: cmmDataMock },
            });
            expect(state).toEqual({ ...initialState, loading: false, data: cmmDataMock });
        });

        it('set state with error content when action type is CC_CALLOUT_FAILURE', async () => {
            const state = reducer(initialState, {
                type: CC_CALLOUT_FAILURE,
                error: 'mission failed',
            });
            expect(state).toEqual({ ...initialState, loading: false, error: 'mission failed' });
        });

        it('return current state when no action is passed', async () => {
            const state = reducer(initialState, {});
            expect(state).toEqual({ ...initialState });
        });
    });
});
