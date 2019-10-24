import { INotification } from "./reducer";
import { TReduxThunk } from "../effects";
import { globalActions } from "../action";

export function pushNotification(n: INotification, timeout: number = 3000): TReduxThunk {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(globalActions.createShiftNotification());
    }, timeout);
    dispatch(globalActions.createPushNotification(n));
  };
}
