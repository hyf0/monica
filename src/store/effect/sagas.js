// 在这里抽离出公共的saga函数
import { fromJS } from 'immutable';

import { call, put } from 'redux-saga/effects';
import { request } from '../../utils/request';

import { normalize, denormalize } from '../../utils';
import { globalActions } from '../actions';

export function* get$TaskById(taskId) {
  try {
    const { data: rawTask } = yield call(request.get, `/tasks/${taskId}`);
    const { items, ...rest } = rawTask;
    const $task = fromJS({
      ...rest,
      items: normalize(items),
    });
    return $task;
  } catch (errResp) {
    yield put(globalActions.addOneNitification(errResp));
    return null;
  }
}

export function* updateTaskBy$task($task) {
  try {
    const { items, ...rest } = $task.toJS();
    const task = {
      ...rest,
      items: denormalize(items),
      timestamp: Date.now(),
    };
    const { data: updatedTask } = yield call(
      request.put,
      `/tasks/${task.id}`,
      task,
    );
    const { items: updatedItems, ...updatedRest } = updatedTask;
    const $updatedTask = fromJS({
      ...updatedRest,
      items: normalize(updatedItems),
    });

    return $updatedTask;
  } catch (errResp) {
    const { data: errorInfo } = errResp;
    errorInfo.type = 'error';
    errorInfo.title = '编辑任务失败';
    yield put(globalActions.addOneNitification(errorInfo));
    return null;
  }
}

export const foo = ' foo';
