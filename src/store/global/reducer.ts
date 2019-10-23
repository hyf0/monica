import { produce } from 'immer';
import { IAction } from '../action';
import { globalActionTypes } from '../actionTypes';
import { NotificationType } from '../../util/constants';

export interface INotification {
  title: string;
  detail?: string;
  type: NotificationType;
}

export interface IReduxGlobalState {
  isShowAsideMenu: boolean;
  notifications: INotification[];
}

const defaultState: IReduxGlobalState = {
  isShowAsideMenu: false,
  notifications: [],
};

export default function globalReducer(state = defaultState, action: IAction) {
  return produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case globalActionTypes.SET_IS_SHOW_ASIDE_MENU:
          draft.isShowAsideMenu = payload as boolean;
        break;
      case globalActionTypes.PUSH_NOTIFICATION:
          draft.notifications.push(payload as INotification);
        break;
      case globalActionTypes.SHIFT_NOTIFICATION:
          draft.notifications.shift();
        break;
    }
  });
}
