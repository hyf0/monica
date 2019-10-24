import gql from 'gql-tag';

import { TReduxThunk, globalEffects } from '../effects';
import { projectActions } from '../action';
import { reqGQL } from '../../util/request';
import API from '../../API';
import { NotificationType } from '../../util/constants';

export function getProjects(): TReduxThunk {
  return async (dispatch, getState) => {
    const {
      user: { user },
    } = getState();
    if (user == null) {
      console.error('未登录');
      return;
    }
    try {
      const {
        data: { data },
      } = await reqGQL({
        variables: { username: user.username },
        query: gql`
          query($username: String!) {
            projects(username: $username) {
              id
              name
              isPinned
              tasks {
                id
                name
              }
            }
          }
        `,
      });
      if (data == null) throw new Error('getProjects失败');
      dispatch(projectActions.createSetProjects(data.projects));
    } catch (err) {
      console.error(err);
    }
  };
}

export function getTodoProject(id: string): TReduxThunk {
  return async (dispatch, getState) => {
    const { project: { isFetchingTodoProject } } = getState();
    if (isFetchingTodoProject) return;
    try {
      dispatch(projectActions.createSetIsFetchingTodoProject(true));
      const project = await API.project.getProject(id);
      dispatch(projectActions.createSetTodoProject(project));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(projectActions.createSetIsFetchingTodoProject(false));
    }
  };
}

export function getEditingProject(id: string): TReduxThunk {
  return async (dispatch, getState) => {
    const { project: { isFetchingEditingProject } } = getState();
    if (isFetchingEditingProject) return;
    try {
      dispatch(projectActions.createSetIsFetchingEditingProject(true));
      const project = await API.project.getProject(id);
      dispatch(projectActions.createSetEditingProject(project));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(projectActions.createSetIsFetchingEditingProject(false));
    }
  };
}

export function createProject({ name }: { name: string }): TReduxThunk {
  return async dispatch => {
    const {
      data: { data },
    } = await reqGQL({
      variables: { name },
      query: gql`
        mutation($name: String!) {
          addProject(name: $name) {
            id
            name
            isPinned
            tasks {
              id
              name
              checked
            }
          }
        }
      `,
    });
    if (data == null) throw new Error('createProject 失败');
    const project = data.addProject;
    dispatch(projectActions.createAddProject(project));
  };
}

export function delProjectById(projectId: string): TReduxThunk {
  return async dispatch => {
    const {
      data: { data },
    } = await reqGQL({
      variables: { id: projectId },
      query: gql`
        mutation($id: String!) {
          delProject(id: $id) {
            id
          }
        }
      `,
    });
    if (data == null) throw new Error('delProject 失败');
    const deletedProjectId = data.delProject.id;
    dispatch(projectActions.createDelProjectById(deletedProjectId));
  };
}

export function createTask(projectId: string, taskName: string): TReduxThunk {
  return async dispatch => {
    const {
      data: { data },
    } = await reqGQL({
      variables: { id: projectId, name: taskName },
      query: gql`
        mutation($id: String!, $name: String!) {
          addTask(projectId: $id, name: $name) {
            id
            name
            checked
          }
        }
      `,
    });
    if (data == null) throw new Error('addTask 失败');
    const task = data.addTask;
    dispatch(projectActions.createAddTaskToEditingProject(task));
  };
}

export function delTask(taskId: string): TReduxThunk {
  return async dispatch => {
    const {
      data: { data },
    } = await reqGQL({
      variables: { id: taskId },
      query: gql`
        mutation($id: String!) {
          delTask(id: $id) {
            id
          }
        }
      `,
    });
    if (data == null) throw new Error('delTask 失败');
    const deletedTaskId = data.delTask.id;
    dispatch(projectActions.createDelTaskToEditingProject(deletedTaskId));
  };
}

export function setProjectIsPinned(
  projectId: string,
  isPinned: boolean,
): TReduxThunk {
  return async dispatch => {
    const patchedProject = await API.project.patchProject(projectId, {
      isPinned,
    });
    if (patchedProject == null) throw new Error('setProjectIsPinned 失败');
    dispatch(
      projectActions.createSetOneProjectIsPinnedById(projectId, isPinned),
    );
  };
}

export function saveEditingProjectName(): TReduxThunk {
  return async (dispatch, getState) => {
    const { project: {editingProject: { current }} } = getState();
    if (current == null) return;
    const { id: projectId, name } = current;
    const patchedProject = await API.project.patchProject(projectId, {
      name,
    });
    if (patchedProject == null) throw new Error('saveEditingProjectName 失败');
    dispatch(projectActions.createChangeProjectNameById(projectId, name));
    dispatch(globalEffects.pushNotification({
      type: NotificationType.SUCCESS,
      title: '成功更改项目名称',
    }, 1500));
  };
}

export function redoEditingProject(): TReduxThunk {
  return async dispatch => {
    dispatch(projectActions.createRedoEditingProject());
  };
}

export function undoEditingProject(): TReduxThunk {
  return async dispatch => {
    dispatch(projectActions.createUndoEditingProject());
  };
}
