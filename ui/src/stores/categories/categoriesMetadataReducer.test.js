import reducer from './categoriesMetadataReducer';
import { CATEGORIES_METADATA_PENDING, CATEGORIES_METADATA_SUCCESS, CATEGORIES_METADATA_FAILURE } from '../actionTypes';

const categoriesMetadataDataMock = {
    1: {},
    2: {},
};

describe('Categories', () => {
    describe('Categories Metadata Reducer', () => {
        const initialState = {
            loading: false,
            error: null,
            data: {},
        };

        it('set initial state when no data is passed', async () => {
            const state = reducer(undefined, {});
            expect(state).toEqual({ ...initialState });
        });

        it('set state as loading when action type is CATEGORIES_METADATA_PENDING', async () => {
            const state = reducer(initialState, { type: CATEGORIES_METADATA_PENDING });
            expect(state).toEqual({ ...initialState, loading: true });
        });

        it('set state with payload when action type is CATEGORIES_METADATA_SUCCESS', async () => {
            const state = reducer(initialState, {
                type: CATEGORIES_METADATA_SUCCESS,
                payload: categoriesMetadataDataMock,
            });
            expect(state).toEqual({ ...initialState, loading: false, ...categoriesMetadataDataMock });
        });

        it('set state with error content when action type is CATEGORIES_METADATA_FAILURE', async () => {
            const state = reducer(initialState, {
                type: CATEGORIES_METADATA_FAILURE,
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
