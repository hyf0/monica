import React, { useCallback, useEffect, useMemo } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';
import EditIcon from '@material-ui/icons/BorderColor';
import {
  List, ListItemText, IconButton, ListItem, Divider, Typography,
} from '@material-ui/core';

import { TransitionGroup, Slide } from 'react-dump-transition';
import NotFound from '../../components/NotFound';
import { taskActions } from '../../store/actions';
import Checkbox from '../../components/Checkbox';

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
    match: {
      params: { id: taskId },
    },
    history,
    $currentTodoTask,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch(taskActions.effectGetTask(taskId));
    return () => {
      // 离开当前任务页面时，重置状态树中的currentTodoTask为null，保持状态树整洁
      dispatch(taskActions.changeCurrentTodoTask(null));
    };
  }, [dispatch, taskId]);

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
      // history.push(`/edit/${taskIdWillJump}`);
      history.push(`/edit/${$currentTodoTask.get('id')}`);
    },
    [history, $currentTodoTask],
  );

  if ($currentTodoTask == null) return <NotFound message="Loding..." time={5000} />;

  return (
    <>
      <List>
        <ListItem dense>
          <Typography variant="h4" gutterBottom>
            {$currentTodoTask.get('title')}
          </Typography>
          <IconButton onClick={jumpToEditingPage}>
            <EditIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider variant="fullWidth" />
      <List>
        {unfinishedTaskItemRefs.length === 0 ? null : (
          <ListItem dense>
            <Typography variant="subtitle1" gutterBottom>
            待完成
            </Typography>
          </ListItem>
        )}
        <TransitionGroup>
          {unfinishedTaskItemRefs.length === 0 ? null : unfinishedTaskItemRefs.map((taskItemId) => {
            const $item = $currentTodoTask.getIn(['items', 'entity', taskItemId]);
            return (
              <Slide timeout={500} direction="right" key={$item.get('id')}>
                <div>
                  <ListItemOfTaskItemWithCheckbox
                    onClick={toggleTaskItemPropChecked}
                    $taskItem={$item}
                  />
                  <Divider variant="middle" />
                </div>
              </Slide>
            );
          })}
        </TransitionGroup>
      </List>
      <List>
        {finishedTaskItemRefs.length === 0 ? null : (
          <ListItem dense>
            <Typography variant="subtitle1" gutterBottom>
            已完成
            </Typography>
          </ListItem>
        )}
        <TransitionGroup>
          {finishedTaskItemRefs.map((taskItemId) => {
            const $item = $currentTodoTask.getIn(['items', 'entity', taskItemId]);
            return (
              <Slide timeout={500} direction="right" key={$item.get('id')}>
                <div>
                  <ListItemOfTaskItemWithCheckbox
                    style={{
                      opacity: '0.5',
                    }}
                    onClick={toggleTaskItemPropChecked}
                    $taskItem={$item}
                  />
                  <Divider variant="middle" />
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      action: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // $tasks: PropTypes.instanceOf(List).isRequired,
  // $tasksEntity: PropTypes.instanceOf(Map).isRequired,
  $currentTodoTask: PropTypes.instanceOf(Map),
  dispatch: PropTypes.func.isRequired,
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
