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
