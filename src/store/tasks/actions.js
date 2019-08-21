import * as actionTypes from './actionTypes';

export const addTaskToTasks = task => ({
  type: actionTypes.ADD_TASK_TO_TASKS,
  payload: task,
});

export const removeTaskInTasks = task => ({
  type: actionTypes.REMOVE_TASK_IN_TASKS,
  payload: task,
});

export const changeCurrentTodoTask = $task => ({
  type: actionTypes.CHANGE_CURRENT_TODO_TASK,
  payload: $task,
});

export const changeCurrentTodoTaskById = taskId => ({
  type: actionTypes.CHANGE_CURRENT_TODO_TASK_BY_ID,
  payload: taskId,
});

export const addTaskIdToRecentTaskIds = $taskId => ({
  type: actionTypes.ADD_TASK_ID_TO_RECENT_TASK_IDS,
  payload: $taskId,
});

export const removeTaskIdInRecentTaskIds = $taskId => ({
  type: actionTypes.REMOVE_TASK_ID_IN_RECENT_TASK_IDS,
  payload: $taskId,
});

export const addTaskIdToPinnedTaskIds = $taskId => ({
  type: actionTypes.ADD_TASK_ID_TO_PINNED_TASK_IDS,
  payload: $taskId,
});

export const removeTaskIdInPinnedTaskIds = $taskId => ({
  type: actionTypes.REMOVE_TASK_ID_IN_PINNED_TASK_IDS,
  payload: $taskId,
});

// -- task item

export const checkTaskItemInTaskItemsByIndex = index => ({
  type: actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_INDEX,
  payload: index,
});

export const checkTaskItemInTaskItemsByTaskId = taskId => ({
  type: actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID,
  payload: taskId,
});

export const toggleTaskItemPropChecked = $taskItem => ({
  type: actionTypes.TOGGLE_TASK_ITEM_CHECKED,
  payload: $taskItem,
});

// edting task

export const updateTaskFromEdting = $task => ({
  type: actionTypes.UPDARE_TASK_FROM_EDTING,
  payload: $task,
});
