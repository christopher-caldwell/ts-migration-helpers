import {
    RESTRICTION_PENDING,
    RESTRICTION_SUCCESS,
    RESTRICTION_FAILURE,
    RESTRICTION_UPDATE_STAGED_DATA,
    CREATE_RESTRICTION_SUCCESS,
    EDIT_RESTRICTION_SUCCESS,
    CLEAR_STAGED_RESTRICTION_CHANGES,
} from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: [],
    staged: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESTRICTION_PENDING:
            return { ...state, loading: true, error: null };
        case RESTRICTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: payload.restrictions || state.data,
            };
        case RESTRICTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case RESTRICTION_UPDATE_STAGED_DATA:
            return {
                ...state,
                staged: payload.map(currentItem => ({
                    id: currentItem.id,
                    name: currentItem.name,
                    synchronized: true,
                    restrictionHour: currentItem.hours.map(currentHour => ({
                        hour: currentHour,
                    })),
                })),
            };
        case CREATE_RESTRICTION_SUCCESS: {
            const hours = [];
            payload.restrictionHour.forEach(hour => hours.push({ hour }));

            const restrictions = [
                {
                    id: -1,
                    name: payload.name,
                    restrictionHour: hours,
                    stationId: payload.stationId,
                    synchronized: false,
                },
            ];

            return {
                ...state,
                loading: false,
                error: null,
                data: [...state.data, ...restrictions],
            };
        }
        case EDIT_RESTRICTION_SUCCESS: {
            const hours = [];
            action.payload.restrictionHour.forEach(hour => hours.push({ hour }));
            const updatedRestriction = {
                ...action.payload,
                restrictionHour: hours,
            };

            const newStagedData = state.staged
                .filter(currentItem => currentItem.id !== updatedRestriction.id)
                .concat(updatedRestriction);

            return {
                ...state,
                loading: false,
                error: null,
                staged: newStagedData,
            };
        }
        case CLEAR_STAGED_RESTRICTION_CHANGES: {
            return {
                ...state,
                staged: [],
            };
        }

        default:
            return state;
    }
};
