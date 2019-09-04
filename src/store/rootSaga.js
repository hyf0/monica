import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { effectActionTypes } from './actionTypes';
import { request } from '../utils/request';
import { taskActions, globalActions } from './actions';
import { normalize } from '../utils';

import userSagas from './user/saga';
import taskSagas from './tasks/saga';
import editingTaskSagas from './editingTask/saga';
import globalSagas from './global/sagas';


// function* login(action) {
//   try {
//     const { payload: userInfo } = action;
//     const { data: loginResp } = yield call(
//       request.post,
//       '/users/login',
//       userInfo,
//     );
//     const { user: userInfoResp = null, token, ...rest } = loginResp;
//     setLocalJWT(token);
//     yield put(
//       userActions.loginSuccess(
//         fromJS({
//           token,
//           userInfo: userInfoResp,
//           ...rest,
//         }),
//       ),
//     );
//   } catch (e) {
//     yield put(userActions.loginFail(e));
//   }
// }

// function* register(action) {
//   try {
//     const { payload: userInfo } = action;
//     const { data: registerResp } = yield call(request.post, '/users', userInfo);
//     const { user: userInfoResp = null, token, ...rest } = registerResp;
//     setLocalJWT(token);
//     yield put(
//       userActions.registerSuccess(
//         fromJS({
//           token,
//           userInfo: userInfoResp,
//           ...rest,
//         }),
//       ),
//     );
//   } catch (errResp) {
//     yield put(userActions.registerFail());
//   }
// }

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
  } catch (errResp) {
    // eslint-disable-next-line no-console
    console.error('createTask', errResp);
    yield put(globalActions.addOneNitification(errResp));
  }
}

function* mySaga() {
  // yield takeLatest(effectActionTypes.EFFECT_REGISTER, register);
  // yield takeLatest(effectActionTypes.EFFECT_LOGIN, login);

  // tasks

  yield takeEvery(effectActionTypes.EFFECT_CREATE_TASK, createTask);

  yield all([
    ...userSagas,
    ...taskSagas,
    ...editingTaskSagas,
    ...globalSagas,
  ]);
}

export default mySaga;
