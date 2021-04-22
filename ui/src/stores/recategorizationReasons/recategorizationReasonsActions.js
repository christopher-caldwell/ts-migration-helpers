import request from 'utils/request';
import { REQUEST_REASONS, RECEIVE_REASONS, THROW_REASONS } from '../actionTypes';

export const requestReasons = () => ({ type: REQUEST_REASONS });

export const receiveReasons = payload => ({ type: RECEIVE_REASONS, payload });

export const throwReasons = error => ({ type: THROW_REASONS, error });

const fetchReasons = () => dispatch => {
    dispatch(requestReasons());
    return request('/recategorization/reasons')
        .then(data => {
            const reasonsList = data.map(option => ({
                id: option.id,
                label: option.label,
                value: option.label,
                acceptDescription: option.acceptDescription,
            }));

            dispatch(receiveReasons(reasonsList));
        })
        .catch(err => dispatch(throwReasons(err)));
};

export default fetchReasons;
