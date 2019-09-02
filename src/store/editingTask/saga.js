import { fromJS } from 'immutable';
import { call, takeEvery, put } from 'redux-saga/effects';
import { request } from '../../utils/request';

import { editingTaskActionTypes } from '../actionTypes';
import { taskActions, editingTaskActions } from '../actions';
import { normalize, denormalize } from '../../utils';
import { get$TaskById } from '../effect/sagas';

function* updateTask({ payload: $task }) {
  try {
    const { items, ...rest } = $task.toJS();
    const task = {
      ...rest,
      items: denormalize(items),
      timestamp: Date.now(),
    };
    const { data: updatedTask } = yield call(request.put, `/tasks/${task.id}`, task);
    const { items: updatedItems, ...updatedRest } = updatedTask;
    const $updatedTask = fromJS({
      ...updatedRest,
      items: normalize(updatedItems),
    });

    yield put(taskActions.updateTaskInTasks($updatedTask));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function* get$TaskThenChange({ payload: taskId }) {
  const $task = yield call(get$TaskById, taskId);
  if ($task == null) return;
  yield put(editingTaskActions.changeCurrentTask($task));
}


export default [
  takeEvery(editingTaskActionTypes.EFFECT_UPDATE_TASK, updateTask),
  takeEvery(editingTaskActionTypes.EFFECT_GET_TASK, get$TaskThenChange),

];
