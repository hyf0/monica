import { IAction } from '../action';
import { userActionTypes } from '../actionTypes';

export function createSetIsLoginning(status: boolean): IAction {
  return {
    type: userActionTypes.SET_IS_LOGINING,
    payload: status,
  };
}

export function createSetUser(user: null | { id: string; username: string }): IAction {
  return {
    type: userActionTypes.SET_USER,
    payload: user,
  };
}
