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
  isFetchingTodoProject: boolean;
  isFetchingEditingProject: boolean;
  editingProject: {
    prev: IProject[];
    current: null | IProject;
    currentIndex: number;
    future: IProject[];
  };
}

const defaultState: IReduxProjectState = {
  projects: null,
  todoProject: null,
  isFetchingTodoProject: false,
  isFetchingEditingProject: false,
  editingProject: {
    prev: [],
    current: null,
    currentIndex: -1,
    future: [],
  },
};

export default function projectReducer(state = defaultState, action: IAction) {
  return produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case projectActionTypes.SET_PROJECTS:
        draft.projects = payload as IProject[];
        break;
      // todo project 相关
      case projectActionTypes.SET_TODO_PROJECT:
        draft.todoProject = payload as IProject;
        break;
      case projectActionTypes.CLEAR_TODO_PROJECT:
        draft.todoProject = null;
        break;
      case projectActionTypes.SET_IS_FETCHING_TODO_PROJECT:
        draft.isFetchingTodoProject = payload as boolean;
        break;
      // edting project 相关
      case projectActionTypes.SET_IS_FETCHING_EDITING_PROJECT:
        draft.isFetchingEditingProject = payload as boolean;
        break;
      case projectActionTypes.SET_EDITING_PROJECT:
        draft.editingProject.current = payload as IProject;
        break;
      case projectActionTypes.CLEAR_EDITING_PROJECT:
        draft.editingProject.current = null;
        break;
      case projectActionTypes.ADD_PROJECT:
        if (draft.projects != null) draft.projects.push(payload as IProject);
        break;
      case projectActionTypes.DEL_PROJECT_BY_ID:
        {
          const projectId: string = payload as string;
          if (draft.projects != null)
            draft.projects = draft.projects.filter(p => p.id !== projectId);
        }
        break;
      case projectActionTypes.ADD_TASK_TO_EDITING_PROJECT:
        if (draft.editingProject.current != null)
          draft.editingProject.current.tasks.push(payload as ITask);
        break;
      case projectActionTypes.DEL_TASK_IN_EDITING_PROJECT:
        {
          const taskId: string = payload as string;
          if (draft.editingProject.current != null)
            draft.editingProject.current.tasks = draft.editingProject.current.tasks.filter(
              t => t.id !== taskId,
            );
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
      // 编辑相关
      case projectActionTypes.SET_ONE_PROJECT_IS_PINEED_BY_ID:
        {
          const { projectId, isPinned } = payload as {
            projectId: string;
            isPinned: boolean;
          };
          if (draft.projects != null) {
            draft.projects.some(p => {
              if (p.id !== projectId) return false;
              p.isPinned = isPinned;
              return true;
            });
          }
        }
        break;
      case projectActionTypes.CHANGE_PROJECT_NAME_BY_ID:
        {
          const { projectName, projectId } = payload as {
            projectName: string;
            projectId: string;
          };
          if (draft.projects != null) {
            const target = draft.projects.find(p => p.id === projectId);
            if (target != null) target.name = projectName;
          }
        }
        break;
      case projectActionTypes.CHANGE_EDITING_PROJECT_NAME:
        if (draft.editingProject.current != null) {
          draft.editingProject.current.name = payload as string;
        }
        break;
      // editing project 时间旅行相关代码
      case projectActionTypes.SNAPSHOT_EDITINGP_PROJECT:
        {
          const currentEditingProject = draft.editingProject.current;
          if (currentEditingProject != null) {
            draft.editingProject.prev.push(currentEditingProject);
          }
        }
        break;
      case projectActionTypes.UNDO_EDITING_PROJECT:
        {
          if (draft.editingProject.current == null) return;
          const prevProjects = draft.editingProject.prev;
          const futuProjects = draft.editingProject.future;
          if (prevProjects.length > 0) {
            futuProjects.push(draft.editingProject.current);
            draft.editingProject.current = prevProjects.pop() as IProject;
          }
        }
        break;
      case projectActionTypes.REDO_EDITING_PROJECT:
        {
          if (draft.editingProject.current == null) return;
          const prevProjects = draft.editingProject.prev;
          const futuProjects = draft.editingProject.future;
          if (futuProjects.length > 0) {
            prevProjects.push(draft.editingProject.current);
            draft.editingProject.current = futuProjects.pop() as IProject;
          }
        }
        break;
      case projectActionTypes.CLEAR_EDITING_HISTORY:
        draft.editingProject.prev = [];
        draft.editingProject.future = [];
        break;
      case projectActionTypes.CLEAR_EDITING_PROJECT_FUTURE:
        draft.editingProject.future = [];
        break;
    }
  });
}
