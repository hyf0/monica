import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { request } from '../../utils/request';
import { normalize } from '../../utils';
import { taskActions } from '../actions';
import { taskActionTypes } from '../actionTypes';
import { get$TaskById } from '../effect/sagas';

function* getTaskList() {
  try {
    const { data: rowTaskList } = yield call(request.get, '/tasks');
    const $tasks = fromJS(
      normalize(
        rowTaskList.map(({ items, ...rest }) => ({
          ...rest,
          items: fromJS(normalize(items)),
        })),
      ),
    );
    yield put(taskActions.changeTasks($tasks));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function* deleteTaskById({ payload: taskId }) {
  try {
    yield call(request.delete, `/tasks/${taskId}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function* get$TaskThenChangeAndUpdate({ payload: taskId }) {
  const $task = yield call(get$TaskById, taskId);
  if ($task == null) return;
  yield put(taskActions.changeCurrentTodoTask($task));
  yield put(taskActions.updateTaskInTasks($task));
}


export default [
  takeEvery(taskActionTypes.EFFECT_GET_TASK_LIST, getTaskList),
  takeEvery(taskActionTypes.EFFECT_DELETE_TASK, deleteTaskById),
  takeEvery(taskActionTypes.EFFECT_GET_TASK, get$TaskThenChangeAndUpdate),
];
