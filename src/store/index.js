import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';


import * as constants from './actionTypes';
import * as actions from './actions';
import reducers from './reducer';

import rootSaga from './rootSaga';

import { isDev } from '../env';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// eslint-disable-next-line import/no-mutable-exports
let store;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (isDev()) {
  // eslint-disable-next-line no-console
  console.log('正处于develoment模式');
  store = createStore(
    reducers,
    /* eslint-disable */
    composeEnhancers(applyMiddleware(...middlewares)),
  );
} else {
  store = createStore(reducers, applyMiddleware(...middlewares));
}

sagaMiddleware.run(rootSaga)

// const store = createStore(persistedReducer);

export { store, constants, actions };
