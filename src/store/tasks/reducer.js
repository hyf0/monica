/* eslint-disable */
import { fromJS, Map, List } from 'immutable';
/* eslint-enable */

import * as actionTypes from './actionTypes';
import { uniqueId, normalize } from '../../utils';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  tasks: normalize([
    {
      id: uniqueId(),
      title: '创建一个任务',
      items: normalize([
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
      ]),
    },
  ]),
  recentTaskIds: [],
  pinnedTaskIds: [],
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
      const { payload: targetTask } = action;
      const targetId = targetTask.get('id');
      return state.set(
        'tasks',
        tasks.merge({
          entity: tasksEntity.delete(targetId),
          refs: tasksRefs.filter(id => id !== targetId),
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
    case actionTypes.ADD_TASK_ID_TO_RECENT_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const updatedrecentTasks = state
        .get('recentTaskIds')
        .filter(taskId => targetTaskId !== taskId) // remove self if exist
        .unshift(targetTaskId);
      return state.set('recentTaskIds', updatedrecentTasks);
    }
    case actionTypes.REMOVE_TASK_ID_IN_RECENT_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const updatedrecentTasks = state
        .get('recentTaskIds')
        .filter(taskId => targetTaskId !== taskId); // remove self if exist
      return state.set('recentTaskIds', updatedrecentTasks);
    }
    case actionTypes.ADD_TASK_ID_TO_PINNED_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const updatedrecentTasks = state
        .get('pinnedTaskIds')
        .filter(taskId => targetTaskId !== taskId) // remove self if exist
        .unshift(targetTaskId);
      return state.set('pinnedTaskIds', updatedrecentTasks);
    }
    case actionTypes.REMOVE_TASK_ID_IN_PINNED_TASK_IDS: {
      const { payload: targetTaskId } = action;
      const updatedrecentTasks = state
        .get('pinnedTaskIds')
        .filter(taskId => targetTaskId !== taskId); // remove self if exist
      return state.set('pinnedTaskIds', updatedrecentTasks);
    }

    // editing task item

    case actionTypes.TOGGLE_TASK_ITEM_CHECKED: {
      const taskItem = payload;
      const propPath = ['currentTodoTask', 'items', 'entity', taskItem.get('id'), 'checked'];
      return state.setIn(propPath, !state.getIn(propPath));
    }

    case actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_INDEX: {
      const taskItemIndex = payload;
      const targetTaskItemId = state.getIn(['currentTodoTask', 'items', 'refs', taskItemIndex]);
      return state.setIn(['currentTodoTask', 'items', 'entity', targetTaskItemId, 'checked'], true);
    }

    case actionTypes.CHECK_TASK_ITEM_IN_TASK_ITEMS_BY_TASK_ID: {
      const taskId = payload;
      return state.setIn(['currentTodoTask', 'items', 'entity', taskId, 'checked'], true);
    }

    case actionTypes.UPDARE_TASK_FROM_EDTING: {
      const task = payload;
      const id = task.get('id');
      return state.setIn(['tasks', 'entity', id], task);
    }

    default:
      return state;
  }
};

export default TasksReducer;
