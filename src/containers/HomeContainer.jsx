/* eslint-disable function-paren-newline */
import React, { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';

import PinnedTaskList from '../components/PinnedTaskList';

import { editingTaskActions } from '../store/actions';
import RecentTaskList from '../components/RecentTaskList';

function HomeContainer(props) {
  const {
    $tasksRefs,
    dispatch,
    history,
    $tasksEntity,
  } = props;

  const $recentTasks = useMemo(
    () =>
      $tasksRefs.map(ref => $tasksEntity.get(ref)).sort(($taskA, $taskB) => {
        const taskATime = $taskA.get('lastVisitTime') || 0;
        const taskBTime = $taskB.get('lastVisitTime') || 0;
        return taskBTime - taskATime;
      }),
    [$tasksRefs, $tasksEntity],
  );

  const $pinnedTasks = useMemo(
    () => $tasksRefs.map(ref => $tasksEntity.get(ref)).filter($task => $task.get('isPinned')),
    [$tasksRefs, $tasksEntity],
  );

  const pinOneTask = useCallback(
    ($task) => {
      const $pinndTask = $task.set('isPinned', true);
      dispatch(editingTaskActions.effectUpdateTask($pinndTask));
    },
    [dispatch],
  );

  const unpinOneTask = useCallback(
    ($task) => {
      const $unpinndTask = $task.set('isPinned', false);
      dispatch(editingTaskActions.effectUpdateTask($unpinndTask));
    },
    [dispatch],
  );

  const onClickTask = useCallback(
    ($task) => {
      history.push(`/todo/${$task.get('id')}`);
    },
    [history],
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
  // $recentTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  // $pinnedTaskIds: PropTypes.instanceOf(ImmutableList).isRequired,
  $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  $tasksRefs: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

HomeContainer.defaultProps = {};

const mapState = ($state) => {
  const $task = $state.get('task');
  return {
    $recentTaskIds: $task.get('recentTaskIds'),
    $pinnedTaskIds: $task.get('pinnedTaskIds'),
    $tasksEntity: $task.getIn(['tasks', 'entity']),
    $tasksRefs: $task.getIn(['tasks', 'refs']),
  };
};

export default connect(
  mapState,
  null,
)(HomeContainer);
