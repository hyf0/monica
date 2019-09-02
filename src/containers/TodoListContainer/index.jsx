import React, { useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import NotFound from '../../components/NotFound';
import TaskItemList from '../../components/TaskItemList';
import { taskActions } from '../../store/actions';

function TodoListContainer(props) {
  const {
    match: {
      params: { id: taskId },
    },
    $currentTodoTask,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch(taskActions.effectGetTask(taskId));
    return () => {
      // 离开当前任务页面时，重置状态树中的currentTodoTask为null，保持状态树整洁
      dispatch(taskActions.changeCurrentTodoTask(null));
    };
  }, [dispatch, taskId]);

  // useEffect(() => {
  //   dispatch(taskActions.changeCurrentTodoTaskById(taskId));
  // }, [taskId, dispatch]);

  const toggleTaskItemPropChecked = useCallback(
    ($taskItem) => {
      dispatch(taskActions.toggleTaskItemPropChecked($taskItem));
    },
    [dispatch],
  );

  if ($currentTodoTask == null) return <NotFound message="Loding..." time={5000} />;

  return (
    <TaskItemList
      onClickCheckbox={toggleTaskItemPropChecked}
      $task={$currentTodoTask}
      isEditable={false}
    />
  );
}

TodoListContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      action: PropTypes.string,
    }),
  }).isRequired,
  // $tasks: PropTypes.instanceOf(List).isRequired,
  // $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  $currentTodoTask: PropTypes.instanceOf(Map),
  dispatch: PropTypes.func.isRequired,
};

TodoListContainer.defaultProps = {
  $currentTodoTask: null,
};

const mapState = ($state) => {
  const $global = $state.get('global');
  const $task = $state.get('task');
  return {
    showSideMenu: $global.get('showSideMenu'),
    $tasksEntity: $task.getIn(['tasks', 'entity']),
    $currentTodoTask: $task.get('currentTodoTask'),
  };
};

export default connect(
  mapState,
  null,
)(TodoListContainer);

// export default TodoListContainer;
