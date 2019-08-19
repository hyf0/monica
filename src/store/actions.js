import * as constants from './actionTypes';

export const showSideMenu = () => ({
  type: constants.SHOW_SIDE_MENU,
});

export const hideSideMenu = () => ({
  type: constants.HIDE_SIDE_MENU,
});

export const createNewTask = task => ({
  type: constants.CREATE_TASK,
  payload: task,
});

export const editTask = task => ({
  type: constants.EDIT_TASK,
  payload: task,
});

export const removeTask = task => ({
  type: constants.REMOVE_TASK,
  payload: task,
});

export const changeCurrentTask = task => ({
  type: constants.CHANGE_CURRENT_TASK,
  payload: task,
});

export const changeCurrentTaskById = taskId => ({
  type: constants.CHANGE_CURRENT_TASK_BY_ID,
  payload: taskId,
});

export const changeCurrentEditingTask = task => ({
  type: constants.CHANGE_CURRENT_CURRENT_EDITING_TASK,
  payload: task,
});

export const addNewTaskItemInCurrentEditingTask = taskItem => ({
  type: constants.ADD_NEW_TASK_ITEM_IN_CURRENT_EDITING_TASK,
  payload: taskItem,
});

export const removeTaskItemInCurrentEditingTask = taskItem => ({
  type: constants.REMOVE_TASK_ITEM_IN_CURRENT_EDITING_TASK,
  payload: taskItem,
});

export const syncCurrentEdtingTaskToTasks = () => ({
  type: constants.SYNC_CURRENT_EDITING_TASK_TO_TASKS,
});

export const resetIsEditngTaskEdited = (flag = false) => ({
  type: constants.RESET_IS_EDITING_TASK_EDITED,
  payload: flag,
});

export const completeTheFirstUncheckedTaskItem = () => ({
  type: constants.COMPLETE_THE_FIRST_UNCHECKED_TASK_ITEM,
});

export const completeAllUncheckedTaskItem = () => ({
  type: constants.COMPLETE_ALL_UNCHECKED_TASK_ITEM,
});

export const toggleTaskItemChecked = $taskItem => ({
  type: constants.TOGGLE_TASK_ITEM_CHECKED,
  payload: $taskItem,
});

export const addTaskIdToRecentTaskIds = $taskId => ({
  type: constants.ADD_TASK_ID_TO_RECENT_TASK_IDS,
  payload: $taskId,
});

export const removeTaskIdInRecentTaskIds = $taskId => ({
  type: constants.REMOVE_TASK_ID_IN_RECENT_TASK_IDS,
  payload: $taskId,
});

export const addTaskIdToPinnedTaskIds = $taskId => ({
  type: constants.ADD_TASK_ID_TO_PINNED_TASK_IDS,
  payload: $taskId,
});

export const removeTaskIdInPinnedTaskIds = $taskId => ({
  type: constants.REMOVE_TASK_ID_IN_PINNED_TASK_IDS,
  payload: $taskId,
});
