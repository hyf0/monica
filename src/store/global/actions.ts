import { IAction } from "../action";
import { globalActionTypes } from "../actionTypes";

export function createSetIsShowAsideMenu(status: boolean): IAction {
    return {
        type: globalActionTypes.SET_IS_SHOW_ASIDE_MENU,
        payload: status,
    }
}