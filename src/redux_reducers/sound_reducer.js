import { setStorage } from '../components/utils';

const INITIAL_STATE = {
    sounds: {},
    is_mute: false,
};

export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
        case 'ADD_SOUNDS': 
            return {...state, 
                sounds: {...state.sounds, ...action.payload}
            }
        case 'SET_MUTE':

            setStorage('is_mute', action.payload);
            return {
                ...state,
                is_mute: action.payload
            }
        default:
            return state;
    }
};
