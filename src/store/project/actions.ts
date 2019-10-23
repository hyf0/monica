import { IAction } from '../action';
import { projectActionTypes } from '../actionTypes';
import { IProject, ITask } from './reducer';

export function createSetProjects(projects: IProject[]): IAction {
  return {
    type: projectActionTypes.SET_PROJECTS,
    payload: projects,
  };
}

// todo project 相关

export function createToggleCheckTaskInTodoProjectById(
  taskId: string,
): IAction {
  return {
    type: projectActionTypes.TOGGLE_CHECK_TASK_IN_TODO_PROJECT_BY_ID,
    payload: taskId,
  };
}
export function createSetTodoProject(project: IProject): IAction {
  return {
    type: projectActionTypes.SET_TODO_PROJECT,
    payload: project,
  };
}

export function createSetIsFetchingTodoProject(status: boolean): IAction {
  return {
    type: projectActionTypes.SET_IS_FETCHING_TODO_PROJECT,
    payload: status,
  };
}

export function createClearTodoProject(): IAction {
  return {
    type: projectActionTypes.CLEAR_TODO_PROJECT,
  };
}

export function createAddProject(project: IProject): IAction {
  return {
    type: projectActionTypes.ADD_PROJECT,
    payload: project,
  };
}

export function createDelProjectById(projectId: string): IAction {
  return {
    type: projectActionTypes.DEL_PROJECT_BY_ID,
    payload: projectId,
  };
}

// editing project 相关

export function createSetIsFetchingEditingProject(status: boolean): IAction {
  return {
    type: projectActionTypes.SET_IS_FETCHING_EDITING_PROJECT,
    payload: status,
  };
}

export function createSetEditingProject(project: IProject): IAction {
  return {
    type: projectActionTypes.SET_EDITING_PROJECT,
    payload: project,
  };
}

export function createClearEditingProject(): IAction {
  return {
    type: projectActionTypes.CLEAR_EDITING_PROJECT,
  };
}

export function createAddTaskToEditingProject(task: ITask): IAction {
  return {
    type: projectActionTypes.ADD_TASK_TO_EDITING_PROJECT,
    payload: task,
  };
}

export function createDelTaskToEditingProject(taskId: string): IAction {
  return {
    type: projectActionTypes.DEL_TASK_IN_EDITING_PROJECT,
    payload: taskId,
  };
}

// 编辑 project 本身
export function createSetOneProjectIsPinnedById(
  projectId: string,
  isPinned: boolean,
): IAction {
  return {
    type: projectActionTypes.SET_ONE_PROJECT_IS_PINEED_BY_ID,
    payload: {
      projectId,
      isPinned,
    },
  };
}

export function createChangeEditingProjectName(name: string): IAction {
  return {
    type: projectActionTypes.CHANGE_EDITING_PROJECT_NAME,
    payload: name,
  };
}

export function createChangeProjectNameById(
  projectId: string,
  projectName: string,
): IAction {
  return {
    type: projectActionTypes.CHANGE_PROJECT_NAME_BY_ID,
    payload: {
      projectId,
      projectName,
    },
  };
}

// 时间旅行相关
export function createSnapshotEditingpProject(): IAction {
  return {
    type: projectActionTypes.SNAPSHOT_EDITINGP_PROJECT,
  };
}
export function createRedoEditingProject(): IAction {
  return {
    type: projectActionTypes.REDO_EDITING_PROJECT,
  };
}
export function createUndoEditingProject(): IAction {
  return {
    type: projectActionTypes.UNDO_EDITING_PROJECT,
  };
}

export function createClearEditingHistory(): IAction {
  return {
    type: projectActionTypes.CLEAR_EDITING_HISTORY,
  };
}

export function createClearEditingProjectFuture(): IAction {
  return {
    type: projectActionTypes.CLEAR_EDITING_PROJECT_FUTURE,
  };
}
