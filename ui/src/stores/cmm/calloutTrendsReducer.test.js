import reducer from './calloutTrendsReducer';
import { CALLOUT_TRENDS_PENDING, CALLOUT_TRENDS_SUCCESS, CALLOUT_TRENDS_FAILURE } from '../actionTypes';

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

describe('CMM Reducer', () => {
    describe('Callout Trends', () => {
        const initialState = {
            loading: false,
            error: null,
        };

        it('set initial state when no data is passed', async () => {
            const state = reducer(undefined, {});
            expect(state).toEqual({ ...initialState });
        });

        it('set state as loading when action type is CALLOUT_TRENDS_PENDING', async () => {
            const state = reducer(initialState, { type: CALLOUT_TRENDS_PENDING });
            expect(state).toEqual({ ...initialState, loading: true });
        });

        it('set state with payload when action type is CALLOUT_TRENDS_SUCCESS', async () => {
            const state = reducer(initialState, { type: CALLOUT_TRENDS_SUCCESS, payload: trendsMock });
            expect(state).toEqual({ ...initialState, loading: false, ...trendsMock });
        });

        it('set state with error content when action type is CALLOUT_TRENDS_FAILURE', async () => {
            const state = reducer(initialState, { type: CALLOUT_TRENDS_FAILURE, error: 'mission failed' });
            expect(state).toEqual({ ...initialState, loading: false, error: 'mission failed' });
        });

        it('return current state when no action is passed', async () => {
            const state = reducer(initialState, {});
            expect(state).toEqual({ ...initialState });
        });
    });
});
