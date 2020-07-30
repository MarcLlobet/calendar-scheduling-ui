import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducer from './reducer'
import Sagas from './sagas'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './localStorage'

const sagaMiddleware = createSagaMiddleware()

const persistedState = loadState()
const store = createStore(reducer, persistedState, applyMiddleware(sagaMiddleware, logger))

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

sagaMiddleware.run(Sagas)

export default store