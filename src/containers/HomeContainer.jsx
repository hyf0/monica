import React, { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import { connect } from 'react-redux';

import PinnedTaskList from '../components/PinnedTaskList';

import {
  addTaskIdToPinnedTaskIds,
  removeTaskIdInPinnedTaskIds,
  addTaskIdToRecentTaskIds,
  changeCurrentTaskById,
} from '../store/actions';
import RecentTaskList from '../components/RecentTaskList';

function HomeContainer(props) {
  const {
    $recentTaskIds, dispatch, history, $tasks, $pinnedTaskIds,
  } = props;

  const $recentTasks = useMemo(
    () => $recentTaskIds.map(taskId => $tasks.find($task => $task.get('id') === taskId)),
    [$recentTaskIds, $tasks],
  );

  const $pinnedTasks = useMemo(
    () => $pinnedTaskIds.map(taskId => $tasks.find($task => $task.get('id') === taskId)),
    [$pinnedTaskIds, $tasks],
  );

  const pinOneTask = useCallback(
    ($task) => {
      const id = $task.get('id');
      dispatch(addTaskIdToPinnedTaskIds(id));
    },
    [dispatch],
  );

  const unpinOneTask = useCallback(
    ($task) => {
      dispatch(removeTaskIdInPinnedTaskIds($task.get('id')));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      const id = $task.get('id');
      dispatch(changeCurrentTaskById(id));
      dispatch(addTaskIdToRecentTaskIds(id));
      history.push(`/todo/${$task.get('id')}`);
    },
    [dispatch, history],
  );

  return (
    <React.Fragment>
      <PinnedTaskList
        onClickIconButton={unpinOneTask}
        onClickTask={onClickTask}
        $tasks={$pinnedTasks}
      />
      <RecentTaskList
        onClickIconButton={pinOneTask}
        onClickTask={onClickTask}
        $tasks={$recentTasks}
      />
    </React.Fragment>
  );
}

HomeContainer.propTypes = {
  $recentTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  $pinnedTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  $tasks: PropTypes.instanceOf(ImmutableList).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

HomeContainer.defaultProps = {};

const mapState = ({ $global }) => ({
  $recentTaskIds: $global.get('$recentTaskIds'),
  $pinnedTaskIds: $global.get('$pinnedTaskIds'),
  $tasks: $global.get('$tasks'),
});

export default connect(
  mapState,
  null,
)(HomeContainer);
