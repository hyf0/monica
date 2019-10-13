import { produce } from 'immer';
import { IAction } from '../action';
import { globalActionTypes } from '../actionTypes';

export interface IReduxGlobalState {
    isShowAsideMenu: boolean;
};

const defaultState:IReduxGlobalState = {
    isShowAsideMenu: false,
};  

export default function globalReducer(state = defaultState, action: IAction) {
    return produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case globalActionTypes.SET_IS_SHOW_ASIDE_MENU: {
                draft.isShowAsideMenu = payload as boolean;
            } break;
        }
    });
}

