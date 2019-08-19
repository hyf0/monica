// import { taskActionTypes, globalActionTypes } from './actionTypes';
import { combineEpics, ofType } from 'redux-observable';
import {} from 'react-router-dom';

import { Observable } from 'rxjs';
import {
  map, concatMap, tap, concat,
} from 'rxjs/operators';
import { globalActionTypes } from './actionTypes';
import { taskActions } from './actions';

/**
 * @param {Observable} action$
 */
export const taskEpic = (action$, $state) => {
  /** @type Observable */
  let history;
  let pathUrl;
  const changeCurTodoTask$ = action$.pipe(
    ofType(globalActionTypes.CHANGE_CURRENT_PATH),
    tap((action) => {
      const {
        sideEffect: { history: reactRouterHistory },
        path,
      } = action;
      history = reactRouterHistory;
      pathUrl = path;
    }),
    concatMap(({ sideEffect: { id, history } }) => taskActions.changeCurrentTodoTaskById(id)),
  );

  const afterChangeCurTodoTask$ = changeCurTodoTask$.pipe(map(() => action$));

  const ubsubAfterChangeCurTodoTask = afterChangeCurTodoTask$.subscribe({
    next() {
      // const {
      //   sideEffect: { history: reactRouterHistory },
      //   path,
      // } = action;
      // console.log('reactRouterHistory', reactRouterHistory);
      history.push(pathUrl);
    },
    complete() {
      ubsubAfterChangeCurTodoTask();
    },
  });

  return changeCurTodoTask$;
};

export default combineEpics(taskEpic);
