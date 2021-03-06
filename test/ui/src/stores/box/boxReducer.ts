import { BOX_PENDING, BOX_CLEARED_SUCCESS, BOX_FAILURE, BOX_OPEN_SUCCESS, BOX_CLOSED_SUCCESS } from '../actionTypes';

const InitialState = {
    loading: false,
    error: null,
    open: {},
    closed: {},
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
export default (state = InitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case BOX_PENDING:
            return { ...state, loading: true, error: null };
        case BOX_CLEARED_SUCCESS:
            return { ...state, loading: false, error: null };
        case BOX_FAILURE:
            return { ...state, loading: false, error: payload.error };
        case BOX_OPEN_SUCCESS:
            return {
                ...state,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{ loading:... Remove this comment to see the full error message
                loading: false,
                error: null,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{ loading:... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{ loading:... Remove this comment to see the full error message
                open: payload ? payload.boxData : state.data,
            };
        case BOX_CLOSED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                closed: {
                    closed: payload.boxClosedData.closed,
                    synchronized: payload.boxClosedData.synchronized,
                    lastSyncDate: payload.boxClosedData.last_sync_date,
                    templates: payload.boxClosedData.templates,
                },
            };
        default:
            return state;
    }
};
