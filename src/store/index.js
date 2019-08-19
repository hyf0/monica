import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import immutableTransform from 'redux-persist-transform-immutable';
import { createEpicMiddleware } from 'redux-observable';

// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import * as constants from './actionTypes';
import * as actions from './actions';
import reducers from './reducer';
import epics from './epics';

import { isDev } from '../env';

const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware];

// eslint-disable-next-line import/no-mutable-exports
let store;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (isDev) {
  console.log('正处于develoment模式');
  store = createStore(
    reducers,
    /* eslint-disable */
    composeEnhancers(applyMiddleware(...middlewares)),
  );
} else {
  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  store = createStore(persistedReducer, applyMiddleware(...middlewares));
}

epicMiddleware.run(epics);

// const store = createStore(persistedReducer);
let persistor;
if (!isDev) persistor = persistStore(store);
export { persistor };

export { store, constants, actions };
