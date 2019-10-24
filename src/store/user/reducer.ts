import { produce } from 'immer';
import { IAction } from '../action';
import { userActionTypes } from '../actionTypes';

export interface IUser {
  id: string;
  username: string;
}

export interface IReduxUserState {
  isLogining: boolean;
  user: null | IUser;
  isRegistering: boolean;
}

const defaultState: IReduxUserState = {
  isLogining: false,
  user: null,
  isRegistering: false,
};

export default function userReducer(state = defaultState, action: IAction) {
  return produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case userActionTypes.SET_IS_LOGINING:
        draft.isLogining = payload as boolean;
        break;
      case userActionTypes.SET_USER:
        draft.user = payload as IUser;
        break;
      case userActionTypes.LOGOUT:
        draft.user = null;
        break;
    }
  });
}
