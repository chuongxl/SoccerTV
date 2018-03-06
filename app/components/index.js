import React, { Component } from 'react';
import AppContainer from './appContainer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from '../reducers/index.js'
import * as appSetting from '../config/appSetting.js';


// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const defaultState =
  {
    liveMatchs: [],
    selectedMatch: null,
    matchLinkInfo: [],
    matchIndex: 0,
    matchLinkIndex: 0
  };
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
      
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore(defaultState);

export default class App extends Component {

  

  render() {

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

