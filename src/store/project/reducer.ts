import { produce } from 'immer';
import { IAction } from '../action';
import { projectActionTypes } from '../actionTypes';

export interface ITask {
  id: string;
  name: string;
  checked: boolean;
}

export interface IProject {
  id: string;
  name: string;
  isPinned: boolean;
  tasks: ITask[];
}

export interface IReduxProjectState {
  projects: null | IProject[];
  todoProject: null | IProject; // currentTodoProject
  editingProject: null | IProject;
}

const defaultState: IReduxProjectState = {
  projects: null,
  todoProject: null,
  editingProject: null,
};

export default function projectReducer(state = defaultState, action: IAction) {
  return produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case projectActionTypes.SET_PROJECTS:
        {
          draft.projects = payload as IProject[];
        }
        break;
      case projectActionTypes.SET_TODO_PROJECT:
        {
          draft.todoProject = payload as IProject;
        }
        break;
      case projectActionTypes.CLEAR_TODO_PROJECT:
        {
          draft.todoProject = null;
        }
        break;
      case projectActionTypes.SET_EDITING_PROJECT:
        {
          draft.editingProject = payload as IProject;
        }
        break;
      case projectActionTypes.CLEAR_EDITING_PROJECT:
        {
          draft.editingProject = null;
        }
        break;
      case projectActionTypes.ADD_PROJECT:
        {
          if (draft.projects != null) draft.projects.push(payload as IProject);
        }
        break;
      case projectActionTypes.DEL_PROJECT_BY_ID:
        {
          const projectId: string = payload as string;
          if (draft.projects != null) draft.projects = draft.projects.filter(p => p.id !== projectId);
        }
        break;
      case projectActionTypes.ADD_TASK_TO_EDITING_PROJECT:
        {
          if (draft.editingProject != null) draft.editingProject.tasks.push(payload as ITask);
        }
        break;
      case projectActionTypes.DEL_TASK_IN_EDITING_PROJECT:
        {
          const taskId: string = payload as string;
          if (draft.editingProject != null)
            draft.editingProject.tasks = draft.editingProject.tasks.filter(t => t.id !== taskId);
        }
        break;
      case projectActionTypes.TOGGLE_CHECK_TASK_IN_TODO_PROJECT_BY_ID:
        {
          if (draft.todoProject == null) break;
          const taskId = payload as string;
          draft.todoProject.tasks.some(t => {
            if (t.id !== taskId) return false;
            t.checked = !t.checked;
            return true;
          });
        }
        break;
      case projectActionTypes.SET_ONE_PROJECT_IS_PINEED_BY_ID: {
        const { projectId, isPinned } = payload as { projectId: string; isPinned: boolean };
        if (draft.projects != null) {
          draft.projects.some(p => {
            if (p.id !== projectId) return false;
            p.isPinned = isPinned;
            return true;
          });
        }
      }
    }
  });
}
