import * as actionTypes from './actionTypes';

export const showSideMenu = () => ({
  type: actionTypes.SHOW_SIDE_MENU,
});

export const hideSideMenu = () => ({
  type: actionTypes.HIDE_SIDE_MENU,
});

export const showAccountManager = () => ({
  type: actionTypes.SHOW_ACCOUNT_MANAGER,
});

export const hideAccountManager = () => ({
  type: actionTypes.HIDE_ACCOUNT_MANAGER,
});

// export const changeCurrentPath = (path, sideEffect = null) => ({
//   type: actionTypes.CHANGE_CURRENT_PATH,
//   payload: path,
//   sideEffect,
// });
