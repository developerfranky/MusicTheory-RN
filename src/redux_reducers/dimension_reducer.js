import {Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

console.log('initial height: ' + Dimensions.get('window').height);

const INITIAL_STATE = {
    is_portrait: true,
    screen_width: Dimensions.get('window').width,
    screen_height: Dimensions.get('window').height,
    working_height: Dimensions.get('window').height - getStatusBarHeight(),
};

export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
        case 'SET_PORTRAIT': 
            console.log('width: ' +  Dimensions.get('window').width);
            console.log('height: ' +  Dimensions.get('window').height);
            console.log('is_portrait: ' +  action.payload);
            return {
                ...state, 
                is_portrait: action.payload,
                screen_width: Dimensions.get('window').width,
                screen_height: Dimensions.get('window').height,
                working_height: Dimensions.get('window').height - getStatusBarHeight(),
            }
        default:
            return state;
    }
};
