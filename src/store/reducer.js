/* eslint-disable */
import { fromJS, Map } from 'immutable';
/* eslint-enable */
import { combineReducers } from 'redux';

import * as constants from './actionTypes';
import { uniqueId } from '../utils';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  showSideMenu: false,
  $tasks: [
    {
      id: uniqueId(),
      title: '创建一个任务',
      $items: [
        {
          id: uniqueId(),
          title: '创建任务: 在侧菜单栏中的输入框内按回车',
          checked: false,
        },
        {
          id: uniqueId(),
          title: '编辑任务: 在侧菜单栏中打开编辑模式',
          checked: false,
        },
        {
          id: uniqueId(),
          title: '添加任务项: 打开编辑模式后，点击编辑按钮',
          checked: false,
        },
        {
          id: uniqueId(),
          title: '保存: 编辑后，点击下方蓝色按钮保存',
          checked: false,
        },
        {
          id: uniqueId(),
          title: '开始一项任务: 在非编辑模式下点击任务即可',
          checked: false,
        },
      ],
    },
  ],
  $recentTaskIds: [],
  $pinnedTaskIds: [],
  $currentTask: null,
  $currentEditingTask: null,
  isEditingTaskEdited: false,
});

/**
 *
 * @param {Map<string, any>} state
 * @param {{type: string, action?: any}} action
 */
const globalReducer = (state = defaultState, action) => {
  if (typeof action.type === 'undefined') {
    throw new Error(`action: ${action} does not has type!`);
  }
  switch (action.type) {
    case constants.SHOW_SIDE_MENU: {
      return state.set('showSideMenu', true);
    }
    case constants.HIDE_SIDE_MENU: {
      return state.set('showSideMenu', false);
    }
    case constants.CREATE_TASK: {
      const { payload: $newTask } = action;
      return state.set('$tasks', state.get('$tasks').concat([$newTask]));
    }
    case constants.REMOVE_TASK: {
      const $targetTask = action.payload;
      return state.set(
        '$tasks',
        state.get('$tasks').filter($task => $task.get('id') !== $targetTask.get('id')),
      );
    }
    case constants.CHANGE_CURRENT_TASK: {
      const { payload: $task } = action;
      return state.set('$currentTask', $task);
    }
    case constants.CHANGE_CURRENT_TASK_BY_ID: {
      const { payload: taskId } = action;
      return state.set(
        '$currentTask',
        state.get('$tasks').find($task => $task.get('id') === taskId),
      );
    }
    case constants.CHANGE_CURRENT_CURRENT_EDITING_TASK: {
      const { payload: $task } = action;
      return state.set('$currentEditingTask', $task);
    }
    case constants.ADD_NEW_TASK_ITEM_IN_CURRENT_EDITING_TASK: {
      const { payload: $newTaskItem } = action;
      const propPath = ['$currentEditingTask', '$items'];
      return state.setIn(propPath, state.getIn(propPath).concat([$newTaskItem]));
    }
    case constants.REMOVE_TASK_ITEM_IN_CURRENT_EDITING_TASK: {
      const { payload: $targetTaskItem } = action;
      const propPath = ['$currentEditingTask', '$items'];
      return state.setIn(
        propPath,
        state
          .getIn(propPath)
          .filter($taskItem => $taskItem.get('id') !== $targetTaskItem.get('id')),
      );
    }
    case constants.SYNC_CURRENT_EDITING_TASK_TO_TASKS: {
      const currentEdtingTask = state.get('$currentEditingTask');
      const id = currentEdtingTask.get('id');
      return state.set(
        '$tasks',
        state
          .get('$tasks')
          .filter($task => $task.get('id') !== id)
          .concat([currentEdtingTask]),
      );
    }
    case constants.RESET_IS_EDITING_TASK_EDITED: {
      const { payload: flag } = action;
      return state.set('isEditingTaskEdited', flag);
    }
    case constants.COMPLETE_THE_FIRST_UNCHECKED_TASK_ITEM: {
      const propPath = ['$currentTask', '$items'];
      const targetKey = state
        .getIn(propPath)
        .findKey($taskItem => $taskItem.get('checked') === false);
      if (targetKey == null) return state;
      return state.setIn(propPath.concat([targetKey, 'checked']), true);
    }
    case constants.COMPLETE_ALL_UNCHECKED_TASK_ITEM: {
      const propPath = ['$currentTask', '$items'];
      return state.setIn(
        propPath,
        state.getIn(propPath).map($taskItem => $taskItem.set('checked', true)),
      );
    }
    case constants.TOGGLE_TASK_ITEM_CHECKED: {
      const { payload: $targetTaskItem } = action;
      const propPath = ['$currentTask', '$items'];
      const targetKey = state
        .getIn(propPath)
        .findKey($taskItem => $taskItem.get('id') === $targetTaskItem.get('id'));
      const targetPropPath = propPath.concat([targetKey, 'checked']);
      return state.setIn(targetPropPath, !state.getIn(targetPropPath));
    }
    case constants.ADD_TASK_ID_TO_RECENT_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const $updatedrecentTasks = state
        .get('$recentTaskIds')
        .filter(taskId => targetTaskId !== taskId) // remove self if exist
        .unshift(targetTaskId);
      return state.set('$recentTaskIds', $updatedrecentTasks);
    }
    case constants.REMOVE_TASK_ID_IN_RECENT_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const $updatedrecentTasks = state
        .get('$recentTaskIds')
        .filter(taskId => targetTaskId !== taskId); // remove self if exist
      return state.set('$recentTaskIds', $updatedrecentTasks);
    }
    case constants.ADD_TASK_ID_TO_PINNED_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const $updatedrecentTasks = state
        .get('$pinnedTaskIds')
        .filter(taskId => targetTaskId !== taskId) // remove self if exist
        .unshift(targetTaskId);
      return state.set('$pinnedTaskIds', $updatedrecentTasks);
    }
    case constants.REMOVE_TASK_ID_IN_PINNED_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const $updatedrecentTasks = state
        .get('$pinnedTaskIds')
        .filter(taskId => targetTaskId !== taskId); // remove self if exist
      return state.set('$pinnedTaskIds', $updatedrecentTasks);
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  $global: globalReducer,
});

/* eslint-disable */

export default reducers;
