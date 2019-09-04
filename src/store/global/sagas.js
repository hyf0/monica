import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import { globalActionTypes } from '../actionTypes';
import { globalActions } from '../actions';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

function* removeTheTopNotificationAfterWhile() {
  yield call(timeout, 3000);
  yield put(globalActions.removeTheTopNitification());
}

export default [
  takeEvery(
    globalActionTypes.ADD_ONE_NOTIFICATION,
    removeTheTopNotificationAfterWhile,
  ),
];
