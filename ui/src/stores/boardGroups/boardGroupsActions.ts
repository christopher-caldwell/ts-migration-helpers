import request from 'utils/request';

import { REQUEST_BOARDGROUPS, RECEIVE_BOARDGROUPS, COMMIT_BOARDGROUPS, THROW_BOARDGROUPS } from '../actionTypes';

// TODO: remove unused actions/reducer logic

const requestBoardGroups = () => ({ type: REQUEST_BOARDGROUPS });
const receiveBoardGroups = (payload: any) => ({
    type: RECEIVE_BOARDGROUPS,
    payload
});

const commitBoardGroups = (payload: any, objectPath: any) => ({
    type: COMMIT_BOARDGROUPS,
    payload,
    objectPath,
});
const throwBoardGroups = (error: any) => ({
    type: THROW_BOARDGROUPS,
    error
});

export const fetchBoardGroups = (boardType: any, options: any) => (dispatch: any) => {
    dispatch(requestBoardGroups());
    return request(`/home/boards/${boardType}`, options)
        .then(rtn => dispatch(receiveBoardGroups(rtn)))
        .catch(err => dispatch(throwBoardGroups(err)));
};

export const updateBoardGroups = (objectPath: any, boardConfig: any) => (dispatch: any) => {
    dispatch(requestBoardGroups());
    return request(`/home/board/${objectPath.boardType}/${objectPath.boardId}`, {
        method: 'PUT',
        body: { config: boardConfig },
    })
        .then(rtn => dispatch(commitBoardGroups(rtn, objectPath)))
        .catch(err => dispatch(throwBoardGroups(err)));
};
