import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import { taskActions, globalActions } from '../store/actions';

import TaskList from '../components/TaskList';

function TaskListContainer(props) {
  const { $tasks, dispatch, history } = props;
  const $tasksEntity = $tasks.get('entity');
  const $tasksRefs = $tasks.get('refs');
  const $taskList = useMemo(
    () => $tasksRefs.map((taskId) => $tasksEntity.get(taskId)),
    [$tasksEntity, $tasksRefs],
  );

  const [isEditable, setIsEditable] = useState(false);

  const toggleIsEditable = useCallback(() => {
    // setIsEditable(prevFlag => !prevFlag);
    setIsEditable(!isEditable);
  }, [setIsEditable, isEditable]);

  const onClickEditTaskButton = useCallback(
    ($task) => {
      dispatch(globalActions.hideSideMenu());
      history.push(`/edit/${$task.get('id')}`);
    },
    [dispatch, history],
  );

  const onClickRemoveTaskButton = useCallback(
    ($task) => {
      dispatch(taskActions.removeTaskInTasks($task));
      dispatch(taskActions.removeTaskIdInRecentTaskIds($task.get('id')));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      // 防止编辑模式点击，然后进入到任务模式，只能在非编辑模式下进入任务
      if (isEditable) return;

      const taskId = $task.get('id');
      dispatch(globalActions.hideSideMenu());
      dispatch(taskActions.addTaskIdToRecentTaskIds(taskId));
      history.push(`/todo/${$task.get('id')}`);
    },
    [dispatch, history, isEditable],
  );

  return (
    <TaskList
      onClickEditTaskButton={onClickEditTaskButton}
      onClickRemoveTaskButton={onClickRemoveTaskButton}
      onClickTask={onClickTask}
      isEditable={isEditable}
      onClickSwitchButton={toggleIsEditable}
      $tasks={$taskList}
    />
  );
}

TaskListContainer.propTypes = {
  $tasks: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapState = ($state) => {
  const $global = $state.get('global');
  const $task = $state.get('task');
  return {
    showSideMenu: $global.get('showSideMenu'),
    $tasks: $task.get('tasks'),
  };
};

export default withRouter(
  connect(
    mapState,
    null,
  )(TaskListContainer),
);
