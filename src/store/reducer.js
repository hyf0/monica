import { combineReducers } from 'redux';

import globalReducer from './global/reducer';
import tasksReducer from './tasks/reducer';
import editingTaskReducer from './editingTask/reducer';

const reducers = combineReducers({
  $global: globalReducer,
  $Task: tasksReducer,
  $editingTask: editingTaskReducer,
});

/* eslint-disable */

export default reducers;
