/* eslint-disable nonblock-statement-body-position */
import React, { useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import TaskItemList from '../components/TaskItemList';
import { taskActions, editingTaskActions } from '../store/actions';
import NotFound from '../components/NotFound';

function EditingTaskPageContainer(props) {
  const {
    match: {
      params: { id: taskId },
    },
    dispatch,
    $tasksEntity,
    $currentEditingTask,
  } = props;

  useEffect(() => {
    // 根据taskid加载对应的将要被编辑的任务
    const $target = $tasksEntity.get(taskId) || null;
    dispatch(editingTaskActions.changeCurrentTask($target));
  }, [dispatch, taskId, $tasksEntity]);

  useEffect(() => {
    // 因为根据taskId加载任务，所以taskId变化，即任务变化，所以每次切换任务，就要重置编辑历史，重置redo，undo按钮状态
    dispatch(editingTaskActions.clearAllEdtingHistory());

    return () => {
      // 即使退出也要重置状态，保持状态树的干净
      dispatch(editingTaskActions.clearAllEdtingHistory());
      // 退出任务, 重置为null，
      dispatch(editingTaskActions.changeCurrentTask(null));
    };
  }, [taskId, dispatch]);

  useEffect(() => {
    // 将编辑后的任务保存到原任务上
    if ($currentEditingTask != null) {
      dispatch(taskActions.updateTaskFromEdting($currentEditingTask));
    }
  }, [$currentEditingTask, dispatch]);

  const onCreateNewTaskItem = useCallback(
    ($newTaskItem) => {
      dispatch(editingTaskActions.snapshotCurrentTask());
      dispatch(editingTaskActions.addTaskItemInCurrentTask($newTaskItem));
      // 因为添加了新任务，所以清空重做任务列表，重置 重做 按钮状态，为了避免编辑状态混乱
      dispatch(editingTaskActions.clearFutureTasks());
    },
    [dispatch],
  );

  const onClickRemoveButton = useCallback(
    ($taskItem) => {
      dispatch(editingTaskActions.snapshotCurrentTask());
      dispatch(editingTaskActions.removeTaskItemInCurrentTask($taskItem));
    },
    [dispatch],
  );

  if ($currentEditingTask == null) return <NotFound />;

  return (
    <TaskItemList
      onCreateNewTaskItem={onCreateNewTaskItem}
      onClickRemoveButton={onClickRemoveButton}
      $task={$currentEditingTask}
      isEditable
    />
  );
}

EditingTaskPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  $currentEditingTask: PropTypes.instanceOf(Map),
  // $tasks: PropTypes.instanceOf(List).isRequired,
  $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

EditingTaskPageContainer.defaultProps = {
  $currentEditingTask: null,
};

const mapState = ({ $global, $Task, $editingTask }) => ({
  showSideMenu: $global.get('showSideMenu'),
  $tasksEntity: $Task.getIn(['tasks', 'entity']),
  $currentEditingTask: $editingTask.get('currentTask'),
});

export default connect(
  mapState,
  null,
)(EditingTaskPageContainer);

// export default EditingTaskPageContainer;
