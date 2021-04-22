// import { allGroupsAndColumns, defaultSetup } from './columnConfig'; // TODO: use this with preferences work
import { allGroupsAndColumns } from './columnConfig';
import { SUCCESS_TABLE_PREFERENCES } from '../actionTypes';

export const successTablePreferences = config => ({
    type: SUCCESS_TABLE_PREFERENCES,
    payload: config,
});

export const setTablePreferences = () => async dispatch => {
    // const {
    //     user: { id },
    // } = getState();
    dispatch(successTablePreferences(allGroupsAndColumns));
    // try { ************ once you actuall implement new prefs! *********************************
    //     const options = {
    //         method: 'PUT',
    //         body: [{ newTable: defaultSetup }],
    //     };
    //     console.log(options);
    //     // const response = await request('/users/${id}/preferences', options);
    // } catch (error) {
    //     console.error(error);
    // }
};

// export const saveCustomizeGroups = (musictracker, competitors) => async (dispatch, getState) => {
//     const { user, boardDetails, preferences } = getState();

//     const { id: userId } = user;
//     const { id: stationId } = boardDetails.layout.board;
//     const stationCompetitors = { ...preferences.competitors, [stationId]: competitors || [] };
//     const method = 'PUT';
//     const body = [{ musictracker: [...musictracker] }, { competitors: stationCompetitors }];

//     try {
//         // Save the preference on the Database.
//         await request(`/users/${userId}/preferences`, { method, body });
//         dispatch(setTrendsColumns(musictracker));
//         dispatch({
//             type: ON_APPLY,
//             payload: { musictracker, competitors: stationCompetitors },
//         });
//         dispatch(closeModal());
//     } catch (error) {
//         console.error(error);
//     }
// };
