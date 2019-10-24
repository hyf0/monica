import { IProject } from '../store/project/reducer';
import { reqGQL } from '../util/request';
import gql from 'gql-tag';

export async function getProject(projectId: string): Promise<IProject> {
  const {
    data: { data },
  } = await reqGQL({
    variables: { id: projectId },
    query: gql`
      query($id: String!) {
        project(id: $id) {
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
  if (data == null) throw new Error('getProject失败');
  return data.project;
}

export async function patchProject(
  projectId: string,
  patcher: { name?: string; isPinned?: boolean },
): Promise<IProject> {
  const {
    data: { data },
  } = await reqGQL({
    variables: { id: projectId, patcher },
    query: gql`
      mutation($id: String!, $patcher: patchProjectInput!) {
        patchProject(id: $id, patcher: $patcher) {
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
  if (data == null) throw new Error('getProject失败');
  return data.patchProject;
}
