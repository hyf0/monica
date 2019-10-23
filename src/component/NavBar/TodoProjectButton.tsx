import React, { useMemo, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';
import { projectActions } from '../../store/action';
import { Color } from '../../util/constants';

const todoProjectButtonSelector = ({ project: { todoProject } }: IReduxState) => ({
  projectId: todoProject == null ? null : todoProject.id,
  tasks: todoProject == null ? [] : todoProject.tasks,
});

export default function TodoProjectButton() {
  const { tasks, projectId } = useShallowEqualSelector(todoProjectButtonSelector);
  // console.log('tasks', tasks);
  const checkedTasks = useMemo(() => tasks.filter(t => t.checked), [tasks]);
  const unchekcedTasks = useMemo(() => tasks.filter(t => !t.checked), [tasks]);
  const dispatch = useDispatch();
  const isAllFininshed = checkedTasks.length === tasks.length;
  let buttonText: string;
  let buttonColor: string;
  if (tasks.length === 0) {
    buttonText = '添加任务项';
    buttonColor = Color.RED;
  } else if (isAllFininshed) {
    buttonText = `完成全部任务(${checkedTasks.length}/${tasks.length})`;
    buttonColor = Color.GREEN;
  } else {
    buttonText = `完成一项任务(${checkedTasks.length}/${tasks.length})`;
    buttonColor = Color.ORANGE;
  }
  const history = useHistory();
  const finishOneTaskOrJumpToRootPageOrEditorPage = useCallback(() => {
    if (tasks.length === 0 && projectId != null) {
      history.push(`/project-editor/${projectId}`);
    } else if (isAllFininshed) {
      history.push('/');
    } else if (unchekcedTasks.length !== 0) {
      dispatch(projectActions.createToggleCheckTaskInTodoProjectById(unchekcedTasks[0].id));
    }
  }, [isAllFininshed, history, unchekcedTasks, dispatch, tasks, projectId]);

  return (
    <Button
      style={{
        backgroundColor: buttonColor,
        color: '#fff',
      }}
      onClick={finishOneTaskOrJumpToRootPageOrEditorPage}
      fullWidth
      variant="outlined"
    >
      {buttonText}
    </Button>
  );
}
