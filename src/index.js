import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './index.css';
import App from './App';

import moment from 'moment';
import 'moment/locale/es';

import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import reducer from './reducer'
import Sagas from './sagas'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './localStorage'
import * as serviceWorker from './serviceWorker';
const sagaMiddleware = createSagaMiddleware()

const persistedState = loadState()
const store = createStore(reducer, persistedState, applyMiddleware(sagaMiddleware, logger))

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

sagaMiddleware.run(Sagas)

moment.locale('es');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
