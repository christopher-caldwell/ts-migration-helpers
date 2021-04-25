import { LOAD_SYSTEM_FEATURES, LOAD_STATION_FEATURES } from '../actionTypes';

const initialState = {
    system: {},
    station: {},
};

const shapeFeatures = (items = []) =>
    items.reduce(
        (accumulatorFeatures, feature) => ({
            ...accumulatorFeatures,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'FeatureName' does not exist on type 'nev... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'FeatureName' does not exist on type 'nev... Remove this comment to see the full error message
            [feature.FeatureName]: feature,
        }),
        {}
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'action' implicitly has an 'any' type.
    );

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SYSTEM_FEATURES:
            return { ...state, system: shapeFeatures(action.features.Items) };
        case LOAD_STATION_FEATURES:
            return { ...state, station: shapeFeatures(action.features.Items) };
        default:
            return state;
    }
};
