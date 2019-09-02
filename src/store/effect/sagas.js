// 在这里抽离出公共的saga函数
import { fromJS } from 'immutable';

import { call } from 'redux-saga/effects';
import { request } from '../../utils/request';

import { normalize } from '../../utils';

export function* get$TaskById(taskId) {
  try {
    const { data: rawTask } = yield call(request.get, `/tasks/${taskId}`);
    const { items, ...rest } = rawTask;
    const $task = fromJS({
      ...rest,
      items: normalize(items),
    });
    return $task;
  } catch (err) {
    return null;
    // eslint-disable-next-line no-console
    // throw err;
  }
}

export const foo = ' foo';
