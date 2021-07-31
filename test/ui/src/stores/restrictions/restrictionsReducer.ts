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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
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
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
                loading: false,
                error: payload.error,
            };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentHour' implicitly has an 'any' ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
        case RESTRICTION_UPDATE_STAGED_DATA:
            return {
                ...state,
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentHour' implicitly has an 'any' ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
                staged: payload.map(currentItem => ({
                    id: currentItem.id,
                    name: currentItem.name,
                    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
                    synchronized: true,
                    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentHour' implicitly has an 'any' ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
                    restrictionHour: currentItem.hours.map(currentHour => ({
                        hour: currentHour,
                    })),
                })),
            };
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
        case CREATE_RESTRICTION_SUCCESS: {
            const hours = [];
            // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            payload.restrictionHour.forEach(hour => hours.push({ hour }));

            const restrictions = [
                {
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
                    id: -1,
                    name: payload.name,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
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
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'hours' implicitly has type 'any[]' in so... Remove this comment to see the full error message
        case EDIT_RESTRICTION_SUCCESS: {
            const hours = [];
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hour' implicitly has an 'any' type.
            action.payload.restrictionHour.forEach(hour => hours.push({ hour }));
            const updatedRestriction = {
                ...action.payload,
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'hours' implicitly has an 'any[]' type.
                restrictionHour: hours,
            };

            const newStagedData = state.staged
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
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
