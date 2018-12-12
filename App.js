import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Router from './src/components/Router';
import reducers from './src/redux_reducers';

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // const store = createStore(reducers, {});

    return ( 
          <Provider store={store}>
            <Router />
          </Provider>
    );
        // <View>
        // </View>
  }
}
