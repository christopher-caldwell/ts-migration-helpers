import {
    DAYPART_PENDING,
    DAYPART_SUCCESS,
    DAYPART_FAILURE,
    CREATE_DAYPART_SUCCESS,
    EDIT_DAYPART_SUCCESS,
    DAYPART_UPDATE_STAGED_DATA,
    CLEAR_STAGED_DAYPART_CHANGES,
} from '../actionTypes';

const initialState = {
    retrieving: false,
    error: null,
    data: [],
    staged: [],
};

export default (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case DAYPART_PENDING:
            return { ...state, retrieving: true, error: null };
        case DAYPART_SUCCESS:
            return {
                ...state,
                retrieving: false,
                error: null,
                data: payload && payload.dayparts ? payload.dayparts : state.data,
            };
        case DAYPART_FAILURE:
            return { ...state, retrieving: false, error: action.payload.error };
        case CREATE_DAYPART_SUCCESS: {
            const daypart = {
                id: -1,
                name: payload.daypartName,
                synchronized: false,
                hours: [],
            };

            return {
                ...state,
                retrieving: false,
                error: null,
                data: [...state.data, daypart],
            };
        }
        case EDIT_DAYPART_SUCCESS: {
            return {
                ...state,
                retrieving: false,
                error: null,
                staged: payload.stagedDayparts.data,
            };
        }
        case DAYPART_UPDATE_STAGED_DATA:
            return {
                ...state,
                staged: payload.map(currentItem => ({
                    id: currentItem.id,
                    name: currentItem.name,
                    synchronized: true,
                    hours: currentItem.hours,
                })),
            };
        case CLEAR_STAGED_DAYPART_CHANGES:
            return { ...state, staged: [] };
        default:
            return state;
    }
};
