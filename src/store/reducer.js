import { combineReducers } from 'redux-immutable';

import globalReducer from './global/reducer';
import tasksReducer from './tasks/reducer';
import editingTaskReducer from './editingTask/reducer';
import userReducer from './user/reducer';


const reducers = combineReducers({
  global: globalReducer,
  task: tasksReducer,
  editingTask: editingTaskReducer,
  user: userReducer,
});

/* eslint-disable */

export default reducers;
