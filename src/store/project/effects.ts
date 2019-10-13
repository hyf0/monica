import gql from 'gql-tag';

import { TReduxThunk } from '../effects';
import { projectActions } from '../action';
import { reqGQL } from '../../util/request';
import API from '../../API';

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
      console.log('resp', data);
      if (data == null) throw new Error('getProjects失败');
      dispatch(projectActions.createSetProjects(data.projects));
    } catch (err) {
      console.error(err);
    }
  };
}

export function getTodoProject(id: string): TReduxThunk {
  return async dispatch => {
    try {
      const project = await API.project.getProject(id);
      dispatch(projectActions.createSetTodoProject(project));
    } catch (err) {
      console.error(err);
    }
  };
}

export function getEditingProject(id: string): TReduxThunk {
  return async dispatch => {
    try {
      const project = await API.project.getProject(id);
      dispatch(projectActions.createSetEditingProject(project));
    } catch (err) {
      console.error(err);
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
    const {
      data: { data },
    } = await reqGQL({
      variables: { id: projectId, patcher: {isPinned} },
      query: gql`
        mutation($id: String!, $patcher: patchProjectInput!) {
          patchProject(id: $id, patcher: $patcher) {
            id
            isPinned
          }
        }
      `,
    });
    if (data == null) throw new Error('pinOneProjectById 失败');
    dispatch(projectActions.createSetOneProjectIsPinnedById(projectId, isPinned));
  };
}
