import { PURCHASED_FULL_VERSION } from '../redux_actions/types';

const INITIAL_STATE = {
    user_is_pro: false, 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PURCHASED_FULL_VERSION: 
            return {
                ...state, 
                user_is_pro: true,
            }
        default:
            return state;
    }
};