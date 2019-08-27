import React, { useCallback } from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Fab from '@material-ui/core/Fab';
import Proptypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { List } from 'immutable';
import { editingTaskActions } from '../store/actions';

const EdtingTaskButtonContainer = (props) => {
  const { $futureTasks, $oldTasks, dispatch } = props;
  const isUndoBtnDisabled = $oldTasks.size === 0;
  const isRedoBtnDisabled = $futureTasks.size === 0;

  const undoEditing = useCallback(() => {
    dispatch(editingTaskActions.undoCurrentTask());
  }, [dispatch]);

  const redoEditing = useCallback(() => {
    dispatch(editingTaskActions.redoCurrentTask());
  }, [dispatch]);

  return (
    <ButtonGroup fullWidth variant="outlined">
      <Button onClick={undoEditing} disabled={isUndoBtnDisabled}>
        Undo
      </Button>
      <Button onClick={redoEditing} disabled={isRedoBtnDisabled}>
        Redo
      </Button>
    </ButtonGroup>
  );
};
EdtingTaskButtonContainer.propTypes = {
  $futureTasks: Proptypes.instanceOf(List).isRequired,
  $oldTasks: Proptypes.instanceOf(List).isRequired,
  dispatch: Proptypes.func.isRequired,
  // isEditingTaskEdited: Proptypes.bool.isRequired,
};

const mapState = ({ $editingTask }) => ({
  $futureTasks: $editingTask.get('futureTasks'),
  $oldTasks: $editingTask.get('oldTasks'),
});
export default connect(
  mapState,
  null,
)(withRouter(EdtingTaskButtonContainer));
