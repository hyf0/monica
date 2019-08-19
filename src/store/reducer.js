import { combineReducers } from 'redux';

import globalReducer from './global/reducer';
import tasksReducer from './tasks/reducer';

const reducers = combineReducers({
  $global: globalReducer,
  $Task: tasksReducer,
});

/* eslint-disable */

export default reducers;
