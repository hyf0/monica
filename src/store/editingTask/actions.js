/* eslint-disable arrow-parens */
import * as actionTypes from './actionTypes';

export const changeCurrentTask = ($task) => ({
  type: actionTypes.CHANGE_CURRENT_TASK,
  payload: $task,
});

export const addTaskItemInCurrentTask = ($taskItem) => ({
  type: actionTypes.ADD_TASK_ITEM_IN_CURRENT_TASK,
  payload: $taskItem,
});

export const removeTaskItemInCurrentTask = ($taskItem) => ({
  type: actionTypes.REMOVE_TASK_ITEM_IN_CURRENT_TASK,
  payload: $taskItem,
});

export const undoCurrentTask = () => ({
  type: actionTypes.UNDO_CURRENT_TASK,
});

export const redoCurrentTask = () => ({
  type: actionTypes.REDO_CURRENT_TASK,
});

export const snapshotCurrentTask = () => ({
  type: actionTypes.SNAPSHOT_CURRENT_TASK,
});

export const clearFutureTasks = () => ({
  type: actionTypes.CLEAR_FUTURE_TASKS,
});

export const clearAllEdtingHistory = () => ({
  type: actionTypes.CLEAR_EDITNG_HISTORY,
});

// effect

export const effectUpdateTask = ($task) => ({
  type: actionTypes.EFFECT_UPDATE_TASK,
  payload: $task,
});

export const effectGetTask = (taskId) => ({
  type: actionTypes.EFFECT_GET_TASK,
  payload: taskId,
});
