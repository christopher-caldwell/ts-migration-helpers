import reducer from './stationCategoriesReducer';
import { STATION_CATEGORIES_PENDING, STATION_CATEGORIES_SUCCESS, STATION_CATEGORIES_FAILURE } from '../actionTypes';

const stationCategoriesDataMock = {
    1: {},
    2: {},
};

describe('Categories', () => {
    describe('Station Categories Reducer', () => {
        const initialState = {
            loading: false,
            error: null,
            data: {},
        };

        it('set initial state when no data is passed', async () => {
            const state = reducer(undefined, {});
            expect(state).toEqual({ ...initialState });
        });

        it('set state as loading when action type is STATION_CATEGORIES_PENDING', async () => {
            const state = reducer(initialState, { type: STATION_CATEGORIES_PENDING });
            expect(state).toEqual({ ...initialState, loading: true });
        });

        it('set state with payload when action type is STATION_CATEGORIES_SUCCESS', async () => {
            const state = reducer(initialState, {
                type: STATION_CATEGORIES_SUCCESS,
                payload: stationCategoriesDataMock,
            });
            expect(state).toEqual({ ...initialState, loading: false, ...stationCategoriesDataMock });
        });

        it('set state with error content when action type is STATION_CATEGORIES_FAILURE', async () => {
            const state = reducer(initialState, {
                type: STATION_CATEGORIES_FAILURE,
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
