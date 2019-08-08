import { createStore } from 'redux';
import * as constants from './contants';
import * as actions from './actions';
import reducer from './reducer';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store, constants, actions };
