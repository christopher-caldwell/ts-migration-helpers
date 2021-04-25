import request from 'utils/request';
import { REQUEST_REASONS, RECEIVE_REASONS, THROW_REASONS } from '../actionTypes';

export const requestReasons = () => ({ type: REQUEST_REASONS });

export const receiveReasons = (payload: any) => ({
    type: RECEIVE_REASONS,
    payload
});

export const throwReasons = (error: any) => ({
    type: THROW_REASONS,
    error
});

const fetchReasons = () => (dispatch: any) => {
    dispatch(requestReasons());
    return request('/recategorization/reasons')
        .then(data => {
            const reasonsList = data.map((option: any) => ({
                id: option.id,
                label: option.label,
                value: option.label,
                acceptDescription: option.acceptDescription
            }));

            dispatch(receiveReasons(reasonsList));
        })
        .catch(err => dispatch(throwReasons(err)));
};

export default fetchReasons;
