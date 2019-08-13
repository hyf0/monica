import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import TaskItemList from '../../components/TaskItemList';
import {
  addNewTaskItemInCurrentEditingTask,
  removeTaskItemInCurrentEditingTask,
  // changeCurrentEditingTask,
  resetIsEditngTaskEdited,
  toggleTaskItemChecked,
} from '../../store/actions';

const FOR_EDITING = 'edit'; // 编辑模式
const FOR_TODO = 'todo'; // 任务模式

function TodoListContainer(props) {
  const {
    // match: {
    //   params: { id: currentEditingTaskId, action },
    // },
    match: {
      params: { action },
    },
    // $tasks,
    dispatch,
  } = props;
  let $task;
  if (action === FOR_EDITING) {
    $task = props.$currentEditingTask;
  } else if (action === FOR_TODO) {
    $task = props.$currentTask;
  }
  const isEditable = action === FOR_EDITING;

  const onCreateNewTaskItem = useCallback(
    ($newTaskItem) => {
      dispatch(addNewTaskItemInCurrentEditingTask($newTaskItem));
      dispatch(resetIsEditngTaskEdited(true));
    },
    [dispatch],
  );

  const onClickRemoveButton = useCallback(
    ($taskItem) => {
      dispatch(removeTaskItemInCurrentEditingTask($taskItem));
      dispatch(resetIsEditngTaskEdited(true));
    },
    [dispatch],
  );

  const toggleTaskItemPropChecked = useCallback(
    ($taskItem) => {
      // 编辑模式不可用
      if (isEditable) return;
      dispatch(toggleTaskItemChecked($taskItem));
    },
    [dispatch, isEditable],
  );

  if ($task == null) return <Redirect to="/" />;

  return (
    <TaskItemList
      onCreateNewTaskItem={onCreateNewTaskItem}
      onClickRemoveButton={onClickRemoveButton}
      onClickCheckbox={toggleTaskItemPropChecked}
      $task={$task}
      isEditable={isEditable}
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
  $currentEditingTask: PropTypes.instanceOf(Map),
  $currentTask: PropTypes.instanceOf(Map),
  dispatch: PropTypes.func.isRequired,
};

TodoListContainer.defaultProps = {
  $currentEditingTask: new Map(),
  $currentTask: new Map(),
};

const mapState = ({ $global }) => ({
  showSideMenu: $global.get('showSideMenu'),
  $currentEditingTask: $global.get('$currentEditingTask'),
  $currentTask: $global.get('$currentTask'),
  $tasks: $global.get('$tasks'),
});

export default connect(
  mapState,
  null,
)(TodoListContainer);

// export default TodoListContainer;
