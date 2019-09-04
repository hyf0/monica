import { call, takeEvery, put } from 'redux-saga/effects';

import { editingTaskActionTypes } from '../actionTypes';
import { taskActions, editingTaskActions } from '../actions';
import { get$TaskById, updateTaskBy$task } from '../effect/sagas';

function* updateTaskThenSyncInTasks({ payload: $task }) {
  const $updatedTask = yield call(updateTaskBy$task, $task);
  if ($updatedTask == null) return;
  yield put(taskActions.updateTaskInTasks($updatedTask));
}

function* get$TaskThenChange({ payload: taskId }) {
  const $task = yield call(get$TaskById, taskId);
  if ($task == null) return;
  yield put(editingTaskActions.changeCurrentTask($task));
}

export default [
  takeEvery(editingTaskActionTypes.EFFECT_UPDATE_TASK, updateTaskThenSyncInTasks),
  takeEvery(editingTaskActionTypes.EFFECT_GET_TASK, get$TaskThenChange),
];
