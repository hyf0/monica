import React, { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import { List as ImmutableList, Map } from 'immutable';
import { connect } from 'react-redux';

import PinnedTaskList from '../components/PinnedTaskList';

import { taskActions } from '../store/actions';
import RecentTaskList from '../components/RecentTaskList';

function HomeContainer(props) {
  const {
    $recentTaskIds, dispatch, history, $tasksEntity, $pinnedTaskIds,
  } = props;

  const $recentTasksWithIsPinnedProp = useMemo(
    () => $recentTaskIds.map(taskId => $tasksEntity.get(taskId).set('isPinned', $pinnedTaskIds.includes(taskId))),
    [$recentTaskIds, $tasksEntity, $pinnedTaskIds],
  );

  const $pinnedTasks = useMemo(() => $pinnedTaskIds.map(taskId => $tasksEntity.get(taskId)), [
    $pinnedTaskIds,
    $tasksEntity,
  ]);

  const pinOneTask = useCallback(
    ($task) => {
      const id = $task.get('id');
      dispatch(taskActions.addTaskIdToPinnedTaskIds(id));
    },
    [dispatch],
  );

  const unpinOneTask = useCallback(
    ($task) => {
      dispatch(taskActions.removeTaskIdInPinnedTaskIds($task.get('id')));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      const id = $task.get('id');
      dispatch(taskActions.addTaskIdToRecentTaskIds(id));
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
        $tasks={$recentTasksWithIsPinnedProp}
      />
    </React.Fragment>
  );
}

HomeContainer.propTypes = {
  $recentTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  $pinnedTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

HomeContainer.defaultProps = {};

const mapState = ({ $Task }) => ({
  $recentTaskIds: $Task.get('recentTaskIds'),
  $pinnedTaskIds: $Task.get('pinnedTaskIds'),
  $tasksEntity: $Task.getIn(['tasks', 'entity']),
});

export default connect(
  mapState,
  null,
)(HomeContainer);
