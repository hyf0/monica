import React, { useCallback } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { projectEffects } from '../../store/effects';
import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';

const taskEditorSelector = ({
  project: {
    editingProject: { prev, future },
  },
}: IReduxState) => ({
  numOfPrevProject: prev.length,
  numOfFutuProject: future.length,
});

export default function TaskEditorButton() {
  const dispatch = useDispatch();
  const { numOfFutuProject, numOfPrevProject } = useShallowEqualSelector(
    taskEditorSelector,
  );

  // 时间旅行相关
  const undoProject = useCallback(() => {
    dispatch(projectEffects.undoEditingProject());
  }, [dispatch]);
  const redoProject = useCallback(() => {
    dispatch(projectEffects.redoEditingProject());
  }, [dispatch]);
  return (
    <ButtonGroup fullWidth>
      <Button disabled={numOfPrevProject === 0} onClick={undoProject}>
        undo
      </Button>
      <Button disabled={numOfFutuProject === 0} onClick={redoProject}>
        redo
      </Button>
    </ButtonGroup>
  );
}
