import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Map } from 'immutable';
import { taskActions, globalActions } from '../../store/actions';

import TaskList from './ui/TaskList';
import { useIsOnline } from '../../hooks';

function TaskListContainer(props) {
  const {
    $tasks, dispatch, hasLogin,
  } = props;
  const history = useHistory();
  const $tasksEntity = $tasks.get('entity');
  const $tasksRefs = $tasks.get('refs');
  const $taskList = useMemo(
    () => $tasksRefs.map((taskId) => $tasksEntity.get(taskId)),
    [$tasksEntity, $tasksRefs],
  );

  const isOnline = useIsOnline();

  const [isEditable, setIsEditable] = useState(false);

  const toggleIsEditable = useCallback(() => {
    if (isOnline) {
      setIsEditable((prevFlag) => !prevFlag);
    }
    // setIsEditable(!isEditable);
  }, [setIsEditable, isOnline]);

  const onClickEditTaskButton = useCallback(
    ($task) => {
      dispatch(globalActions.hideSideMenu());
      history.push(`/edit/${$task.get('id')}`);
    },
    [dispatch, history],
  );

  const onClickRemoveTaskButton = useCallback(
    ($task) => {
      dispatch(taskActions.effectDeleteTask($task.get('id')));
      dispatch(taskActions.removeTaskInTasks($task));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      // 防止编辑模式点击，然后进入到任务模式，只能在非编辑模式下进入任务
      if (isEditable) return;
      dispatch(globalActions.hideSideMenu());
      history.push(`/todo/${$task.get('id')}`);
    },
    [dispatch, history, isEditable],
  );
    // console.log('isOnline && hasLogin && isEditable', isOnline && hasLogin && isEditable);
  return (
    <TaskList
      onClickEditTaskButton={onClickEditTaskButton}
      onClickRemoveTaskButton={onClickRemoveTaskButton}
      onClickTask={onClickTask}
      isEditable={isOnline && hasLogin && isEditable}
      onClickSwitchButton={toggleIsEditable}
      $tasks={$taskList}
    />
  );
}

TaskListContainer.propTypes = {
  $tasks: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
  hasLogin: PropTypes.bool.isRequired,
};

const mapState = ($state) => {
  const $global = $state.get('global');
  const $task = $state.get('task');
  return {
    showSideMenu: $global.get('showSideMenu'),
    $tasks: $task.get('tasks'),
    hasLogin: $state.getIn(['user', 'hasLogin']),
  };
};

export default connect(
  mapState,
  null,
)(TaskListContainer);
