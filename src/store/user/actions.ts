import { IAction } from '../action';
import { userActionTypes } from '../actionTypes';
import { IUser } from './reducer';

export function createSetIsLoginning(status: boolean): IAction {
  return {
    type: userActionTypes.SET_IS_LOGINING,
    payload: status,
  };
}

export function createSetUser(user: IUser): IAction {
  return {
    type: userActionTypes.SET_USER,
    payload: user,
  };
}

export function createLogout(): IAction {
  return {
    type: userActionTypes.LOGOUT,
  }
}
