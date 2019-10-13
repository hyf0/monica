import DefaultLayout from '../layout/DefaultLayout';
import FullScreenLoading from '../ui/FullScreenLoading';
import TodoPorject from '../component/TodoProject';
import LoginPage from '../component/LoginPage';
import RegisterPage from '../component/RegisterPage';
import ProjectEditor from '../component/ProjectEditor';
import PinnedProjectList from '../component/PinnedProjectList';

interface IRoute {
  path: string;
  component: (...args: any[]) => JSX.Element;
  layout?: (...args: any[]) => JSX.Element;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
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
