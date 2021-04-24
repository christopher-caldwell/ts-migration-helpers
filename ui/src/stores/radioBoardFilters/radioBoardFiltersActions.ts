import { STORE_RADIOBOARD_FILTERS } from '../actionTypes';

const updateRadioBoardFilters = payload => ({
    type: STORE_RADIOBOARD_FILTERS,
    payload,
});

export default updateRadioBoardFilters;
