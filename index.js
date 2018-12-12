/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
// import reducers from './src/redux_reducers';

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
// // const store = createStore(reducers, {});

// const _app = () => <App store={store}/>

// AppRegistry.registerComponent(appName, () => _app);
AppRegistry.registerComponent(appName, () => App);
