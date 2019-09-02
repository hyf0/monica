import * as actionTypes from './actionTypes';

export const login = (userInfo) => ({
  type: actionTypes.EFFECT_LOGIN,
  payload: userInfo,
});

export const register = (userInfo) => ({
  type: actionTypes.EFFECT_REGISTER,
  payload: userInfo,
});

export const createTask = (task) => ({
  type: actionTypes.EFFECT_CREATE_TASK,
  payload: task,
});

export const updateTask = (task) => ({
  type: actionTypes.EFFECT_UPDATE_TASK,
  payload: task,
});

// export const changeCurrentPath = (path, sideEffect = null) => ({
//   type: actionTypes.CHANGE_CURRENT_PATH,
//   payload: path,
//   sideEffect,
// });
