/* eslint-disable arrow-parens */
/* eslint-disable */
import { fromJS, Map, List } from 'immutable';
/* eslint-enable */

import * as actionTypes from './actionTypes';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  currentTask: null,
  futureTasks: [],
  oldTasks: [],
});

/**
 *
 * @param {Map<string, any>} state
 * @param {{type: string, action?: any}} action
 */
const editingTaskReducer = (state = defaultState, action) => {
  const { type = null, payload = null } = action;
  if (type == null) {
    throw new Error('action: {action} does not has type!');
  }

  const taskItems = state.getIn(['currentTask', 'items']);
  const taskItemsEntity = state.getIn(['currentTask', 'items', 'entity']);
  const taskItemsRefs = state.getIn(['currentTask', 'items', 'refs']);

  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_TASK: {
      const task = payload;
      return state.set('currentTask', task);
    }
    case actionTypes.ADD_TASK_ITEM_IN_CURRENT_TASK: {
      const $taskItem = payload;
      const id = $taskItem.get('id');
      return state.setIn(
        ['currentTask', 'items'],
        taskItems.merge({
          entity: taskItemsEntity.set(id, $taskItem),
          refs: taskItemsRefs.push(id),
        }),
      );
    }
    case actionTypes.REMOVE_TASK_ITEM_IN_CURRENT_TASK: {
      const $taskItem = payload;
      const id = $taskItem.get('id');
      return state.setIn(
        ['currentTask', 'items'],
        taskItems.merge({
          entity: taskItemsEntity.delete(id),
          refs: taskItemsRefs.filter((tid) => tid !== id),
        }),
      );
    }
    case actionTypes.CHANGE_CURRENT_TASK_TITLE: {
      const newTitle = payload;
      return state.setIn(['currentTask', 'title'], newTitle);
    }
    case actionTypes.UNDO_CURRENT_TASK: {
      const oldTasks = state.get('oldTasks');
      if (oldTasks.length !== 0) {
        const futureTasks = state.get('futureTasks');
        const currentTask = state.get('currentTask');
        const oldTask = oldTasks.last();
        return state.merge({
          currentTask: oldTask,
          futureTasks: futureTasks.push(currentTask),
          oldTasks: oldTasks.pop(),
        });
      }
      return state;
    }
    case actionTypes.REDO_CURRENT_TASK: {
      const futureTasks = state.get('futureTasks');
      if (futureTasks.length !== 0) {
        const oldTasks = state.get('oldTasks');
        const currentTask = state.get('currentTask');
        const futureTask = futureTasks.last();
        return state.merge({
          currentTask: futureTask,
          futureTasks: futureTasks.pop(),
          oldTasks: oldTasks.push(currentTask),
        });
      }
      return state;
    }
    case actionTypes.SNAPSHOT_CURRENT_TASK: {
      const currentTask = state.get('currentTask');
      if (currentTask != null) {
        const oldTasks = state.get('oldTasks');
        return state.set('oldTasks', oldTasks.push(currentTask));
      }
      return state;
    }
    case actionTypes.CLEAR_FUTURE_TASKS: {
      return state.set('futureTasks', state.get('futureTasks').clear());
    }
    case actionTypes.CLEAR_EDITNG_HISTORY: {
      return state.merge({
        futureTasks: state.get('futureTasks').clear(),
        oldTasks: state.get('oldTasks').clear(),
      });
    }
    default:
      return state;
  }
};

export default editingTaskReducer;
