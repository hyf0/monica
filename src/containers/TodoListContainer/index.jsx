import React, { useCallback, useEffect, useMemo } from 'react';

import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, useHistory, useParams } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';
import {
  List, ListItemText, ListItem, Divider, Typography, Slide,
} from '@material-ui/core';
import { TransitionGroup } from 'react-transition-group';
import { taskActions } from '../../store/actions';
import Checkbox from '../../components/Checkbox';
import FullScreenLoading from '../../components/FullScreenLoading';
import TodoListHeader from './ui/TodoListHeader';
import TaskItem from './ui/TaskItem';

function ListItemOfTaskItemWithCheckbox(props) {
  const { $taskItem, onClick: rawOnClick, style } = props;

  const onClick = useCallback(() => rawOnClick($taskItem), [$taskItem, rawOnClick]);

  return (
    <ListItem style={style} button onClick={onClick}>
      <Checkbox edge="start" checked={$taskItem.get('checked')} />
      <ListItemText primary={$taskItem.get('title')} />
    </ListItem>
  );
}

ListItemOfTaskItemWithCheckbox.propTypes = {
  $taskItem: PropTypes.instanceOf(Map).isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

ListItemOfTaskItemWithCheckbox.defaultProps = {
  style: null,
};

function TodoListContainer(props) {
  const {
    $currentTodoTask,
  } = props;

  const { id: taskId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskActions.effectGetTask(taskId));
    return () => {
      // 离开当前任务页面时，重置状态树中的currentTodoTask为null，保持状态树整洁
      dispatch(taskActions.changeCurrentTodoTask(null));
    };
  }, [taskId]);

  const [
    unfinishedTaskItemRefs,
    finishedTaskItemRefs,
  ] = useMemo(() => {
    const unfinished = [];
    const finished = [];
    if ($currentTodoTask != null) {
      const $itemRefs = $currentTodoTask.getIn(['items', 'refs']);
      $itemRefs.forEach(taskItemId => {
        const $item = $currentTodoTask.getIn(['items', 'entity', taskItemId]);
        if ($item.get('checked')) finished.push(taskItemId);
        else unfinished.push(taskItemId);
      });
    }

    return [unfinished, finished];
  }, [$currentTodoTask]);

  const toggleTaskItemPropChecked = useCallback(
    ($taskItem) => {
      dispatch(taskActions.toggleTaskItemPropChecked($taskItem));
    },
    [dispatch],
  );

  const jumpToEditingPage = useCallback(
    () => {
      history.push(`/edit/${$currentTodoTask.get('id')}`);
    },
    [$currentTodoTask],
  );

  if ($currentTodoTask == null) return <FullScreenLoading />;

  return (
    <>
      <TodoListHeader title={$currentTodoTask.get('title')} onClickEditButton={jumpToEditingPage} />
      <Divider variant="fullWidth" />
      <List>
        {unfinishedTaskItemRefs.length === 0 ? null : (
          <ListItem dense>
            <Typography variant="subtitle1">
            待完成
            </Typography>
          </ListItem>
        )}
        <TransitionGroup>
          {unfinishedTaskItemRefs.length === 0 ? null : unfinishedTaskItemRefs.map((taskItemId) => {
            const $item = $currentTodoTask.getIn(['items', 'entity', taskItemId]);
            return (
              <Slide key={$item.get('id')} timeout={500} direction="right">
                <div>
                  <TaskItem $taskItem={$item} onClick={toggleTaskItemPropChecked} />
                </div>
              </Slide>
            );
          })}
        </TransitionGroup>
      </List>
      <List>
        {finishedTaskItemRefs.length === 0 ? null : (
          <ListItem dense>
            <Typography variant="subtitle1">
            已完成
            </Typography>
          </ListItem>
        )}
        <TransitionGroup>
          {finishedTaskItemRefs.map((taskItemId) => {
            const $item = $currentTodoTask.getIn(['items', 'entity', taskItemId]);
            return (
              <Slide key={$item.get('id')} timeout={500} direction="right">
                <div>
                  <TaskItem $taskItem={$item} onClick={toggleTaskItemPropChecked} />
                </div>
              </Slide>
            );
          })}
        </TransitionGroup>
      </List>
    </>
  );
}


TodoListContainer.propTypes = {
  // $tasks: PropTypes.instanceOf(List).isRequired,
  // $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  $currentTodoTask: PropTypes.instanceOf(Map),
};

TodoListContainer.defaultProps = {
  $currentTodoTask: null,
};

const mapState = ($state) => {
  const $global = $state.get('global');
  const $task = $state.get('task');
  return {
    showSideMenu: $global.get('showSideMenu'),
    $tasksEntity: $task.getIn(['tasks', 'entity']),
    $currentTodoTask: $task.get('currentTodoTask'),
  };
};

export default withRouter(
  connect(
    mapState,
    null,
  )(TodoListContainer),
);

// export default TodoListContainer;
