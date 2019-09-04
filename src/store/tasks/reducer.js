/* eslint-disable */
import { fromJS, Map, List } from 'immutable';
/* eslint-enable */

import * as actionTypes from './actionTypes';
import { normalize } from '../../utils';
import { userActionTypes } from '../actionTypes';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  tasks: normalize([]),
  currentTodoTask: null,
});

/**
 *
 * @param {Map<string, any>} state
 * @param {{type: string, action?: any}} action
 */
const TasksReducer = (state = defaultState, action) => {
  const { type = null, payload = null } = action;
  if (type == null) {
    throw new Error('action: {action} does not has type!');
  }
  // 快捷访问方式
  /** @type Map<String, any> */
  const tasks = state.get('tasks');
  /** @type Map<String, any> */
  const tasksEntity = state.getIn(['tasks', 'entity']);
  /** @type List<String> */
  const tasksRefs = state.getIn(['tasks', 'refs']);

  switch (action.type) {
    case actionTypes.CHANGE_TASKS: {
      const tasksTobeChangedTo = payload;
      return state.set('tasks', tasksTobeChangedTo);
    }
    case actionTypes.ADD_TASK_TO_TASKS: {
      const { payload: newTask } = action;
      const id = newTask.get('id');
      return state.set(
        'tasks',
        tasks.merge({
          entity: tasksEntity.set(id, newTask),
          refs: tasksRefs.push(id),
        }),
      );
    }
    case actionTypes.REMOVE_TASK_IN_TASKS: {
      const targetTask = payload;
      const targetId = targetTask.get('id');
      return state.set(
        'tasks',
        tasks.merge({
          entity: tasksEntity.delete(targetId),
          refs: tasksRefs.filter((id) => id !== targetId),
        }),
      );
    }
    case actionTypes.CHANGE_CURRENT_TODO_TASK: {
      const todoTask = payload;
      return state.set('currentTodoTask', todoTask);
    }
    case actionTypes.CHANGE_CURRENT_TODO_TASK_BY_ID: {
      const id = payload;
      return state.set('currentTodoTask', state.getIn(['tasks', 'entity', id]));
    }

    // editing task item

    case actionTypes.TOGGLE_TASK_ITEM_CHECKED: {
      const taskItem = payload;
      const propPath = [
        'currentTodoTask',
        'items',
        'entity',
        taskItem.get('id'),
        'checked',
      ];
      return state.setIn(propPath, !state.getIn(propPath));
    }

    // case actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_INDEX: {
    //   const taskItemIndex = payload;
    //   const targetTaskItemId = state.getIn([
    //     'currentTodoTask',
    //     'items',
    //     'refs',
    //     taskItemIndex,
    //   ]);
    //   return state.setIn(
    //     ['currentTodoTask', 'items', 'entity', targetTaskItemId, 'checked'],
    //     true,
    //   );
    // }

    case actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID: {
      const taskId = payload;
      return state.setIn(
        ['currentTodoTask', 'items', 'entity', taskId, 'checked'],
        true,
      );
    }

    // case actionTypes.UPDARE_TASK_FROM_EDTING: {
    //   const task = payload;
    //   const id = task.get('id');
    //   return state.setIn(['tasks', 'entity', id], task);
    // }
    case actionTypes.UPDATE_TASK_IN_TASKS: {
      const task = payload;
      const id = task.get('id');
      return state.setIn(['tasks', 'entity', id], task);
    }

    // user

    case userActionTypes.LOGOUT: {
      return state.set('tasks', state.get('tasks').merge({
        entity: tasksEntity.clear(),
        refs: tasksRefs.clear(),
      }));
    }

    default:
      return state;
  }
};

export default TasksReducer;
