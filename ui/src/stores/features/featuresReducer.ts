import { LOAD_SYSTEM_FEATURES, LOAD_STATION_FEATURES } from '../actionTypes';

const initialState = {
    system: {},
    station: {},
};

const shapeFeatures = (items = []) =>
    items.reduce(
        (accumulatorFeatures, feature) => ({
            ...accumulatorFeatures,
            [feature.FeatureName]: feature,
        }),
        {}
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
