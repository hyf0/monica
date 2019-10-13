import * as userActions from './user/actions';
import * as globalActions from './global/actions';
import * as projectActions from './project/actions';


export interface IAction {
    type: string;
    payload?: unknown,
}

export {
    userActions,
    globalActions,
    projectActions,
}
