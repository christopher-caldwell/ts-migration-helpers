import { USER_LOGIN } from 'stores/actionTypes';

const initialState = {
    id: null,
    info: null,
};

export default (state = initialState, action: any) => {
    const { payload, type } = action;

    switch (type) {
        case USER_LOGIN:
            return {
                ...state,
                id: payload.userId,
                info: {
                    username: payload.username,
                    fullName: payload.fullName,
                    teams: payload.teams,
                    roles: payload.roles,
                },
            };
        default:
            return state;
    }
};
