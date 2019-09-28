import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import TodoListContainer from '../../containers/TodoListContainer';
import PinnedAndRecentTaskList from '../../containers/PinnedAndRecentTaskList';

import CommonLayout from '../../layouts/CommonLayout';

import { taskActions } from '../../store/actions';
import TaskEditor from '../../containers/TaskEditor';

const hasLoginSelector = $state => $state.getIn(['user', 'hasLogin']);

export default function HomePage() {
  const hasLogin = useSelector(hasLoginSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasLogin) {
      dispatch(taskActions.effectGetTaskList());
    }
  }, [hasLogin]);

  return (
    <CommonLayout>
      <Switch>
        <Route path="/todo/:id" component={TodoListContainer} />
        <Route path="/edit/:id" component={TaskEditor} />
        <Route component={PinnedAndRecentTaskList} />
      </Switch>
    </CommonLayout>
  );
}
