import * as actionTypes from './actionTypes';

export const changeTasks = ($tasks) => ({
  type: actionTypes.CHANGE_TASKS,
  payload: $tasks,
});

export const addTaskToTasks = (task) => ({
  type: actionTypes.ADD_TASK_TO_TASKS,
  payload: task,
});

export const removeTaskInTasks = (task) => ({
  type: actionTypes.REMOVE_TASK_IN_TASKS,
  payload: task,
});

export const changeCurrentTodoTask = ($task) => ({
  type: actionTypes.CHANGE_CURRENT_TODO_TASK,
  payload: $task,
});

export const changeCurrentTodoTaskById = (taskId) => ({
  type: actionTypes.CHANGE_CURRENT_TODO_TASK_BY_ID,
  payload: taskId,
});

// -- task item

export const checkTaskItemInTaskItemsByIndex = (index) => ({
  type: actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_INDEX,
  payload: index,
});

export const checkTaskItemInTaskItemsByTaskId = (taskId) => ({
  type: actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID,
  payload: taskId,
});

export const toggleTaskItemPropChecked = ($taskItem) => ({
  type: actionTypes.TOGGLE_TASK_ITEM_CHECKED,
  payload: $taskItem,
});

// edting task

export const updateTaskFromEdting = ($task) => ({
  type: actionTypes.UPDARE_TASK_FROM_EDTING,
  payload: $task,
});

export const updateTaskInTasks = ($task) => ({
  type: actionTypes.UPDATE_TASK_IN_TASKS,
  payload: $task,
});

// effect

export const effectGetTaskList = () => ({
  type: actionTypes.EFFECT_GET_TASK_LIST,
});

export const effectDeleteTask = (taskId) => ({
  type: actionTypes.EFFECT_DELETE_TASK,
  payload: taskId,
});

export const effectGetTask = (taskId) => ({
  type: actionTypes.EFFECT_GET_TASK,
  payload: taskId,
});

// export const effectUpdateTask = ($task) => ({
//   type: actionTypes.EFFECT_UPDATE_TASK,
//   payload: $task,
// });
