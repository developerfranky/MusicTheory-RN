import {AsyncStorage} from 'react-native';

const setCoinStorage = (num) => {
    // we're only really storing this for when the user quits the app and reopens another time.
    // otherwise everything uses coins from state, not from async storage. 
    AsyncStorage.setItem('coins', JSON.stringify(num), (error) => {
      if (error) {
        console.log('error')
      }
    });
}

export const getCoins = () => {
    console.log('running get coins');
    return (dispatch) => {
        AsyncStorage.getItem('coins', (err, result) => {
            // console.log('inside callback of getcoins');
            // console.log('result');
            // console.log(result);
            // console.log('err');
            // console.log(err);
            if (result) {
                let coins = parseInt(result);
                console.log('coins were stored: ' + coins);
                dispatch({
                    type:'ADD_COINS', 
                    payload: coins
                });
            } 
            else {
                console.log('there was no result in getCoins()');
                const initial_coins = 5;
                setCoinStorage(initial_coins)
                dispatch({
                    type:'ADD_COINS', 
                    payload: initial_coins
                });
            }
        });
    }
}

export const addCoins = (num) => {
    return dispatch => {
        AsyncStorage.getItem('coins', (err, result) => {
            if (result) {
                let coins = parseInt(result);
                coins = coins + num;
                setCoinStorage(coins)
            } 
            else {
                setCoinStorage(num)
            }
            dispatch({
                type:'ADD_COINS', 
                payload: num
            });
        });
    }
};

export const useCoins = (num) => {
    return dispatch => {
        AsyncStorage.getItem('coins', (err, result) => {
            if (result) {
                let coins = parseInt(result);
                if (coins > 0) {
                    coins = coins - num;
                    setCoinStorage(coins)
                }
            } 
            else {
                setCoinStorage(0)
            }

            dispatch({
                type:'USE_COINS', 
                payload: num
            });
        });
    }
};

