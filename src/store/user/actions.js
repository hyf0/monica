import * as actionTypes from './actionTypes';

export const loginSuccess = ($loginInfo) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: $loginInfo,
});

export const loginFail = (err) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: err,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const registerSuccess = ($registerInfo) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: $registerInfo,
});

export const registerFail = (err) => ({
  type: actionTypes.REGISTER_FAIL,
  payload: err,
});

// effect

export const effectGetUserInfo = () => ({
  type: actionTypes.EFFECT_GET_USERINFO,
});

export const effectLogin = (userInfo) => ({
  type: actionTypes.EFFECT_LOGIN,
  payload: userInfo,
});

export const effectRegister = (userInfo) => ({
  type: actionTypes.EFFECT_REGISTER,
  payload: userInfo,
});

// export const changeCurrentPath = (path, sideEffect = null) => ({
//   type: actionTypes.CHANGE_CURRENT_PATH,
//   payload: path,
//   sideEffect,
// });
