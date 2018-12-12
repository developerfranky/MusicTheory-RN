const INITIAL_STATE = {
    coins: 0, 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'ADD_COINS': 
            return {
                ...state, 
                coins: state.coins + action.payload,
            }
        case 'USE_COINS':
            return {
                ...state,
                coins: state.coins - action.payload,
            }

        default:
            return state;
    }
};
