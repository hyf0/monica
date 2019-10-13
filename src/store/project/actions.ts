import { IAction } from '../action';
import { projectActionTypes } from '../actionTypes';
import { IProject, ITask } from './reducer';

export function createSetProjects(projects: IProject[]): IAction {
  return {
    type: projectActionTypes.SET_PROJECTS,
    payload: projects,
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

export function createSetTodoProject(project: IProject): IAction {
  return {
    type: projectActionTypes.SET_TODO_PROJECT,
    payload: project,
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

export function createAddTaskToEditingProject(task: ITask): IAction {
  return {
    type: projectActionTypes.ADD_TASK_TO_EDITING_PROJECT,
    payload: task,
  }
}

export function createDelTaskToEditingProject(taskId: string): IAction {
  return {
    type: projectActionTypes.DEL_TASK_IN_EDITING_PROJECT,
    payload: taskId,
  }
}

export function createToggleCheckTaskInTodoProjectById(taskId: string): IAction {
  return {
    type: projectActionTypes.TOGGLE_CHECK_TASK_IN_TODO_PROJECT_BY_ID,
    payload: taskId,
  }
}

export function createSetOneProjectIsPinnedById(projectId: string, isPinned: boolean): IAction {
  return {
    type: projectActionTypes.SET_ONE_PROJECT_IS_PINEED_BY_ID,
    payload: {
      projectId,
      isPinned,
    },
  }
}
