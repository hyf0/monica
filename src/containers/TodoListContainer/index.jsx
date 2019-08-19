import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import TaskItemList from '../../components/TaskItemList';
import { taskActions } from '../../store/actions';

function TodoListContainer(props) {
  const {
    match: {
      params: { id: taskId },
    },
    $tasksEntity,
    $currentTodoTask,
    dispatch,
  } = props;

  const $targetTask = $tasksEntity.get(taskId);
  if ($currentTodoTask == null) {
    dispatch(taskActions.changeCurrentTodoTask($targetTask));
  }

  const toggleTaskItemPropChecked = useCallback(
    ($taskItem) => {
      dispatch(taskActions.toggleTaskItemPropChecked($taskItem));
    },
    [dispatch],
  );

  if ($currentTodoTask == null) return <div />;

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
  $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  $currentTodoTask: PropTypes.instanceOf(Map),
  dispatch: PropTypes.func.isRequired,
};

TodoListContainer.defaultProps = {
  $currentTodoTask: new Map(),
};

const mapState = ({ $global, $Task }) => ({
  showSideMenu: $global.get('showSideMenu'),
  $tasksEntity: $Task.getIn(['tasks', 'entity']),
  $currentTodoTask: $Task.get('currentTodoTask'),
});

export default connect(
  mapState,
  null,
)(TodoListContainer);

// export default TodoListContainer;
