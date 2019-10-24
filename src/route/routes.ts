import DefaultLayout from '../layout/DefaultLayout';
import TodoPorject from '../component/TodoProject';
import LoginPage from '../component/LoginPage';
import RegisterPage from '../component/RegisterPage';
import ProjectEditor from '../component/ProjectEditor';
import PinnedProjectList from '../component/PinnedProjectList';
import AccountPage from '../component/AccountPage';
import BasicLayout from '../layout/BasicLayout';

interface IRoute {
  path: string;
  component: (...args: any[]) => JSX.Element;
  layout?: (...args: any[]) => JSX.Element;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/login',
    layout: BasicLayout,
    component: LoginPage,
  },
  {
    path: '/register',
    layout: BasicLayout,
    component: RegisterPage,
  },
  {
    path: '/account',
    layout: BasicLayout,
    component: AccountPage,
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/todo-project/:id',
        component: TodoPorject,
      },
      {
        path: "/project-editor/:id",
        component: ProjectEditor,
      },
      {
        path: '/',
        component: PinnedProjectList,
      },
    ],
  },
];
export default routes;
