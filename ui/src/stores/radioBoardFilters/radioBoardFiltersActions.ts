import { STORE_RADIOBOARD_FILTERS } from '../actionTypes';

const updateRadioBoardFilters = (payload: any) => ({
    type: STORE_RADIOBOARD_FILTERS,
    payload
});

export default updateRadioBoardFilters;
