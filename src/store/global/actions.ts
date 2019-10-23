import { IAction } from '../action';
import { globalActionTypes } from '../actionTypes';
import { INotification } from './reducer';

export function createSetIsShowAsideMenu(status: boolean): IAction {
  return {
    type: globalActionTypes.SET_IS_SHOW_ASIDE_MENU,
    payload: status,
  };
}

export function createPushNotification(notification: INotification): IAction {
  return {
    type: globalActionTypes.PUSH_NOTIFICATION,
    payload: notification,
  };
}
export function createShiftNotification(): IAction {
  return {
    type: globalActionTypes.SHIFT_NOTIFICATION,
  };
}
