/* eslint-disable nonblock-statement-body-position */
import React, {
  useCallback, useEffect, useMemo,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { List as ImmutableList } from 'immutable';
import {
  List,
} from '@material-ui/core';

import { editingTaskActions } from '../../store/actions';
import FullScreenLoading from '../../components/FullScreenLoading';
import { makeDebounced } from '../../utils';
import TaskEditorHeader from './ui/TaskEditorHeader';
import EditableTaskItemCollection from './ui/EditableTaskItemCollection';
import TaskItemCreator from './ui/TaskItemCreator';

const currentEditingTaskSelector = $state => $state.getIn(['editingTask', 'currentTask']);

function TaskEditor() {
  const $currentEditingTask = useSelector(currentEditingTaskSelector);
  const dispatch = useDispatch();

  const { id: taskId } = useParams();

  const debouncedEffectUpdateTask = useCallback(makeDebounced($task => {
    dispatch(editingTaskActions.effectUpdateTask($task));
  }, 500), []);

  useEffect(() => {
    dispatch(editingTaskActions.effectGetTask(taskId));
    return () => {
      // 因为根据taskId加载任务，所以taskId变化，即任务变化，所以每次切换任务，就要重置编辑历史，重置redo，undo按钮状态
      // 即使退出也要重置状态，保持状态树的干净
      dispatch(editingTaskActions.clearAllEdtingHistory());
      // 退出任务, 重置为null，
      dispatch(editingTaskActions.changeCurrentTask(null));
    };
  }, [taskId]);

  const addNewTaskItem = useCallback(($newTaskItem) => {
    dispatch(editingTaskActions.snapshotCurrentTask());
    dispatch(editingTaskActions.addTaskItemInCurrentTask($newTaskItem));
    // 因为添加了新任务项，所以清空重做任务列表，重置 重做 按钮状态，为了避免编辑状态混乱
    dispatch(editingTaskActions.clearFutureTasks());
    debouncedEffectUpdateTask($currentEditingTask);
  }, [$currentEditingTask]);

  const removeTaskItem = useCallback($taskItem => {
    dispatch(editingTaskActions.snapshotCurrentTask());
    dispatch(editingTaskActions.removeTaskItemInCurrentTask($taskItem));
    debouncedEffectUpdateTask($currentEditingTask);
  }, [$currentEditingTask]);

  const $taskItems = useMemo(() => {
    if ($currentEditingTask == null) return new ImmutableList();
    return $currentEditingTask
      .getIn(['items', 'refs'])
      .map(taskItemId => $currentEditingTask.getIn(['items', 'entity', taskItemId]));
  }, [$currentEditingTask]);

  const changeTaskTitle = useCallback(evt => {
    const title = evt.target.value.trim();
    dispatch(editingTaskActions.snapshotCurrentTask());
    dispatch(editingTaskActions.changeCurrentTaskTitle(title));
    debouncedEffectUpdateTask($currentEditingTask);
  }, [$currentEditingTask]);

  if ($currentEditingTask == null) return <FullScreenLoading />;

  return (
    <List>
      <TaskEditorHeader onChange={changeTaskTitle} title={$currentEditingTask.get('title')} />
      <EditableTaskItemCollection $items={$taskItems} onClickDeleteButton={removeTaskItem} />
      <TaskItemCreator onCreateTaskItem={addNewTaskItem} />
    </List>
  );
}

// TaskEditor.propTypes = {
//   // $currentEditingTask: PropTypes.instanceOf(Map),
// };

// TaskEditor.defaultProps = {
//   // $currentEditingTask: null,
// };

export default TaskEditor;
