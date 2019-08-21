import React, { useCallback, useReducer, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import TaskItemList from '../components/TaskItemList';
import { taskActions } from '../store/actions';

const actionTypes = {
  ADD_TASK_ITEM_TO_TASK: 'ADD_TASK_ITEM_TO_TASK',
  REMOVE_TASK_ITEM_IN_TASK: 'REMOVE_TASK_ITEM_IN_TASK',
};

function taskReducer($state, action) {
  const $editingTask = $state;
  const $editingTaskItems = $state.get('items');
  const $editingTaskItemsEntity = $state.getIn(['items', 'entity']);
  const $editingTaskItemsRefs = $state.getIn(['items', 'refs']);

  switch (action.type) {
    case actionTypes.ADD_TASK_ITEM_TO_TASK: {
      const { payload: $taskItem } = action;
      const id = $taskItem.get('id');
      return $editingTask.set(
        'items',
        $editingTaskItems.merge({
          entity: $editingTaskItemsEntity.set(id, $taskItem),
          refs: $editingTaskItemsRefs.push(id),
        }),
      );
    }
    case actionTypes.REMOVE_TASK_ITEM_IN_TASK: {
      const { payload: $taskItem } = action;
      const targetId = $taskItem.get('id');
      return $editingTask.set(
        'items',
        $editingTaskItems.merge({
          entity: $editingTaskItemsEntity.delete(targetId),
          refs: $editingTaskItemsRefs.filter(id => id !== targetId),
        }),
      );
    }
    default:
      return $state;
  }
}

function EditingTaskPageContainer(props) {
  const {
    match: {
      params: { id: taskId },
    },
    dispatch,
    $tasksEntity,
  } = props;

  const $targetTask = $tasksEntity.get(taskId);

  const [$task, $taskDispatch] = useReducer(taskReducer, $targetTask);

  useEffect(() => {
    dispatch(taskActions.updateTaskFromEdting($task));
  }, [$task, dispatch]);

  const onCreateNewTaskItem = useCallback(
    ($newTaskItem) => {
      $taskDispatch({
        type: actionTypes.ADD_TASK_ITEM_TO_TASK,
        payload: $newTaskItem,
      });
    },
    [$taskDispatch],
  );

  const onClickRemoveButton = useCallback(
    ($taskItem) => {
      $taskDispatch({
        type: actionTypes.REMOVE_TASK_ITEM_IN_TASK,
        payload: $taskItem,
      });
    },
    [$taskDispatch],
  );

  // const toggleTaskItemPropChecked = useCallback(() => {}, []);

  if ($targetTask == null) return <Redirect to="/" />;

  return (
    <TaskItemList
      onCreateNewTaskItem={onCreateNewTaskItem}
      onClickRemoveButton={onClickRemoveButton}
      // onClickCheckbox={toggleTaskItemPropChecked}
      $task={$task}
      isEditable
    />
  );
}

EditingTaskPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      action: PropTypes.string,
    }),
  }).isRequired,
  // $tasks: PropTypes.instanceOf(List).isRequired,
  $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

EditingTaskPageContainer.defaultProps = {};

const mapState = ({ $global, $Task }) => ({
  showSideMenu: $global.get('showSideMenu'),
  $tasksEntity: $Task.getIn(['tasks', 'entity']),
});

export default connect(
  mapState,
  null,
)(EditingTaskPageContainer);

// export default EditingTaskPageContainer;
