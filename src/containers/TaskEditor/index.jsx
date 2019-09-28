/* eslint-disable nonblock-statement-body-position */
import React, { useCallback, useEffect, useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';

import TaskItemList from './components/TaskItemList';
import { editingTaskActions } from '../../store/actions';
import NotFound from '../../components/NotFound';
// import { uniqueId } from '../utils';

const mapState = ($state) => {
  const $global = $state.get('global');
  const $task = $state.get('task');
  const $editingTask = $state.get('editingTask');
  return {
    showSideMenu: $global.get('showSideMenu'),
    $tasksEntity: $task.getIn(['tasks', 'entity']),
    $currentEditingTask: $editingTask.get('currentTask'),
  };
};

function TaskEditor(props) {
  const {
    $currentEditingTask,
  } = props;

  const { id: taskId } = useParams();

  const [isTaskLoaded, setIsTaskLoaded] = useState(false);
  const [isTaskTaskChanged, setIsTaskTaskChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isTaskLoaded) {
      dispatch(editingTaskActions.effectGetTask(taskId));
      if ($currentEditingTask != null) setIsTaskLoaded(true);
    }
  }, [taskId, isTaskLoaded, setIsTaskLoaded, $currentEditingTask]);

  useEffect(
    () => () => {
      // 因为根据taskId加载任务，所以taskId变化，即任务变化，所以每次切换任务，就要重置编辑历史，重置redo，undo按钮状态
      // 即使退出也要重置状态，保持状态树的干净
      dispatch(editingTaskActions.clearAllEdtingHistory());
      // 退出任务, 重置为null，
      dispatch(editingTaskActions.changeCurrentTask(null));
    },
    [taskId],
  );

  useEffect(() => {
    if (isTaskLoaded && isTaskTaskChanged) {
      // 同步到云端
      dispatch(editingTaskActions.effectUpdateTask($currentEditingTask));
    }
  }, [isTaskLoaded, isTaskTaskChanged, $currentEditingTask]);

  const addNewTaskItem = useCallback($newTaskItem => {
    dispatch(editingTaskActions.snapshotCurrentTask());
    dispatch(editingTaskActions.addTaskItemInCurrentTask($newTaskItem));
    // 因为添加了新任务项，所以清空重做任务列表，重置 重做 按钮状态，为了避免编辑状态混乱
    dispatch(editingTaskActions.clearFutureTasks());
    setIsTaskTaskChanged(true);
  }, []);

  const removeTaskItem = useCallback($taskItem => {
    dispatch(editingTaskActions.snapshotCurrentTask());
    dispatch(editingTaskActions.removeTaskItemInCurrentTask($taskItem));
    setIsTaskTaskChanged(true);
  }, []);

  if ($currentEditingTask == null) return <NotFound message="Loding..." />;

  return (
    <TaskItemList
      onCreateNewTaskItem={addNewTaskItem}
      onClickRemoveButton={removeTaskItem}
      $task={$currentEditingTask}
      isEditable
    />
  );
}

TaskEditor.propTypes = {
  $currentEditingTask: PropTypes.instanceOf(Map),
};

TaskEditor.defaultProps = {
  $currentEditingTask: null,
};

export default connect(
  mapState,
  null,
)(TaskEditor);
