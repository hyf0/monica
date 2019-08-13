import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List } from 'immutable';
import {
  hideSideMenu,
  removeTask,
  changeCurrentEditingTask,
  resetIsEditngTaskEdited,
  changeCurrentTask,
} from '../../store/actions';

import TaskList from '../../components/TaskList';

function TaskListContainer(props) {
  const { $tasks, dispatch, history } = props;

  const [isEditable, setIsEditable] = useState(false);

  const toggleIsEditable = useCallback(() => {
    // setIsEditable(prevFlag => !prevFlag);
    setIsEditable(!isEditable);
  }, [setIsEditable, isEditable]);

  const onClickEditTaskButton = useCallback(
    ($task) => {
      dispatch(resetIsEditngTaskEdited(false));
      dispatch(changeCurrentEditingTask($task));
      dispatch(hideSideMenu());
      history.push(`/edit/${$task.get('id')}`);
    },
    [dispatch, history],
  );

  const onClickRemoveTaskButton = useCallback(
    ($task) => {
      dispatch(removeTask($task));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      // 防止编辑模式点击，然后进入到任务模式，只能在非编辑模式下进入任务
      if (isEditable) return;

      dispatch(hideSideMenu());
      dispatch(changeCurrentTask($task));
      history.push(`/todo/${$task.get('id')}`);
    },
    [dispatch, history, isEditable],
  );

  return (
    <TaskList
      onClickEditTaskButton={onClickEditTaskButton}
      onClickRemoveTaskButton={onClickRemoveTaskButton}
      onClickTask={onClickTask}
      isEditable={isEditable}
      onClickSwitchButton={toggleIsEditable}
      $tasks={$tasks}
    />
  );
}

TaskListContainer.propTypes = {
  $tasks: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapState = ({ $global }) => ({
  showSideMenu: $global.get('showSideMenu'),
  $tasks: $global.get('$tasks'),
});

export default withRouter(
  connect(
    mapState,
    null,
  )(TaskListContainer),
);
