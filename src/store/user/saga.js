import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { userActionTypes } from '../actionTypes';
import { request } from '../../utils/request';
import { setLocalJWT, uniqueId } from '../../utils';
import { userActions, globalActions } from '../actions';

function* getUserInfo() {
  try {
    const { data: userInfo } = yield call(request.get, '/users');
    yield put(userActions.loginSuccess({
      userInfo: fromJS(userInfo),
    }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('登录失败', err);
    setLocalJWT('');
  }
}

function* login(action) {
  try {
    const { payload: userInfo } = action;
    const { data: loginResp } = yield call(
      request.post,
      '/users/login',
      userInfo,
    );
    const { user: userInfoResp = null, token, ...rest } = loginResp;
    setLocalJWT(token);
    yield put(
      userActions.loginSuccess(
        fromJS({
          token,
          userInfo: userInfoResp,
          ...rest,
        }),
      ),
    );
    yield put(globalActions.addOneNitification({
      type: 'success',
      title: '登陆成功',
      key: uniqueId('notifi'),
    }));
  } catch (errResp) {
    yield put(userActions.loginFail());
    yield put(globalActions.addOneNitification(errResp));
  }
}

function* loginByJWT() {
  // request会自动带上jwt，不用手动传递
  try {
    const { data: userInfo } = yield call(request.get, '/users');
    yield put(userActions.loginSuccess({
      userInfo: fromJS(userInfo),
    }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('登录失败', err);
    setLocalJWT('');
  }
}

function* register(action) {
  try {
    const { payload: userInfo } = action;
    const { data: registerResp } = yield call(request.post, '/users', userInfo);
    const { user: userInfoResp = null, token, ...rest } = registerResp;
    setLocalJWT(token);
    yield put(
      userActions.registerSuccess(
        fromJS({
          token,
          userInfo: userInfoResp,
          ...rest,
        }),
      ),
    );
    yield put(globalActions.addOneNitification({
      type: 'success',
      title: '注册成功',
      message: '已经为您自动登录应用',
    }));
  } catch (errResp) {
    yield put(userActions.registerFail());
    yield put(globalActions.addOneNitification(errResp));
  }
}

export default [
  takeEvery(userActionTypes.EFFECT_GET_USERINFO, getUserInfo),
  takeLatest(userActionTypes.EFFECT_LOGIN_BY_JWT, loginByJWT),
  takeLatest(userActionTypes.EFFECT_REGISTER, register),
  takeLatest(userActionTypes.EFFECT_LOGIN, login),
];
