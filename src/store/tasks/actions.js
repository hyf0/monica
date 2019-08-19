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

export const toggleTaskItemPropChecked = $taskItem => ({
  type: actionTypes.TOGGLE_TASK_ITEM_CHECKED,
  payload: $taskItem,
});

// -- tobe remobed

export const syncCurrentEdtingTaskToTasks = $task => ({
  type: actionTypes.SYNC_CURRENT_EDITING_TASK_TO_TASKS,
  payload: $task,
});

// export const addNewTaskItemInCurrentEditingTask = taskItem => ({
//   type: actionTypes.ADD_NEW_TASK_ITEM_IN_CURRENT_EDITING_TASK,
//   payload: taskItem,
// });

// export const removeTaskItemInCurrentEditingTask = taskItem => ({
//   type: actionTypes.REMOVE_TASK_ITEM_IN_CURRENT_EDITING_TASK,
//   payload: taskItem,
// });

// export const resetIsEditngTaskEdited = (flag = false) => ({
//   type: actionTypes.RESET_IS_EDITING_TASK_EDITED,
//   payload: flag,
// });

// export const completeTheFirstUncheckedTaskItem = () => ({
//   type: actionTypes.COMPLETE_THE_FIRST_UNCHECKED_TASK_ITEM,
// });

// export const completeAllUncheckedTaskItem = () => ({
//   type: actionTypes.COMPLETE_ALL_UNCHECKED_TASK_ITEM,
// });
