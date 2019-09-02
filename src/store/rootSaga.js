import {
  call, put, takeLatest, takeEvery, all,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { effectActionTypes } from './actionTypes';
import { request } from '../utils/request';
import { userActions, taskActions } from './actions';
import { setLocalJWT, normalize } from '../utils';

import userSaga from './user/saga';
import taskSaga from './tasks/saga';
import editingTaskSaga from './editingTask/saga';


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
  } catch (e) {
    yield put(userActions.loginFail(e));
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
  } catch (e) {
    yield put(userActions.registerFail(e));
  }
}

function* createTask(action) {
  try {
    const { payload: task } = action;
    const { data: taskResp } = yield call(request.post, '/tasks', task);
    const { items } = taskResp;
    yield put(
      taskActions.addTaskToTasks(
        fromJS({
          ...taskResp,
          items: normalize(items),
        }),
      ),
    );
  } catch (e) {
    console.error('createTask', e);
    // yield put(userActions.registerFail(e));
  }
}

function* mySaga() {
  yield takeLatest(effectActionTypes.EFFECT_REGISTER, register);
  yield takeLatest(effectActionTypes.EFFECT_LOGIN, login);

  // tasks

  yield takeEvery(effectActionTypes.EFFECT_CREATE_TASK, createTask);

  yield all([
    ...userSaga,
    ...taskSaga,
    ...editingTaskSaga,
  ]);
}

export default mySaga;
