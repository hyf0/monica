import React, { useCallback, useEffect } from 'react';

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
    $currentTodoTask,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch(taskActions.changeCurrentTodoTaskById(taskId));
  }, [taskId, dispatch]);

  const toggleTaskItemPropChecked = useCallback(
    ($taskItem) => {
      dispatch(taskActions.toggleTaskItemPropChecked($taskItem));
    },
    [dispatch],
  );

  if ($currentTodoTask == null) return <div>404: NOT FOUND TASK</div>;

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
