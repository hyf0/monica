import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { userActionTypes } from '../actionTypes';
import { request } from '../../utils/request';
import { setLocalJWT } from '../../utils';
import { userActions } from '../actions';

function* getUserInfo() {
  try {
    const { data: userInfo } = yield call(request.get, '/users');
    yield put(userActions.loginSuccess({
      userInfo: fromJS(userInfo),
    }));
  } catch (err) {
    console.error(err);
    setLocalJWT('');
  }
}

export default [
  takeEvery(userActionTypes.EFFECT_GET_USERINFO, getUserInfo),
];
