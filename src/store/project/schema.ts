import { schema, normalize } from 'normalizr';
// normalizr 这个库对ts的类型支持很不良好
import { IProject, ITask } from './reducer';
import { INormalizedData } from '../normalizr';

const taskSchema = new schema.Entity('tasks');

// project 

const projectSchema = new schema.Entity('projects', {
  tasks: [taskSchema],
});

interface IProjectEntitiesProject extends Omit<IProject, 'tasks'> {
  tasks: string[];
}

export interface IProjectEntities {
  tasks: Record<string, ITask>;
  projects: Record<string, IProjectEntitiesProject>;
}

export type TNormalizedProject = INormalizedData<IProjectEntities, string>;

export const normalizeProeject = (project: IProject) => normalize<any, IProjectEntities, string>(project, projectSchema);

// end project

// projects

const projectsSchema = new schema.Array(projectSchema);

export interface IProjectsEntities {
  projects: Record<string, IProject>,
}

export const normalizeProjects = (projects: IProject[]) => normalize<any, IProjectsEntities, string[]>(projects, projectsSchema);

// end projects


const n = normalizeProjects([{
  id: '123',
  name: '123',
  isPinned: false,
  tasks: [],
}])

