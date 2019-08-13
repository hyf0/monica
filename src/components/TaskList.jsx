import React, { useCallback } from 'react';
import { css } from 'emotion';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import {
  ListItem,
  ListItemText,
  Divider,
  Switch as SwitchButton,
  Typography,
} from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import List from './List';

const slowFade = css`
  .slow-fade-enter {
    opacity: 0;
  }
  .slow-fade-enter-active {
    opacity: 1;
    transition: all 600ms ease-out;
  }
  .slow-fade-exit {
    opacity: 1;
  }
  .slow-fade-exit-active {
    opacity: 0;
    transition: all 600ms ease-out;
  }
`;

/* eslint-disable */
const renderTask = ({
  $task,
  onClickTask,
  onClickEditTaskButton,
  onClickRemoveTaskButton,
  isEditable,
}) => (
  <CSSTransition key={$task.get('id')} timeout={600} classNames="slow-fade">
    <React.Fragment>
      <ListItem style={{ height: '48px' }} onClick={() => onClickTask($task)} button={!isEditable}>
        <ListItemText primary={$task.get('title')} />
        {isEditable ? (
          <React.Fragment>
            <IconButton onClick={(evt) => onClickEditTaskButton(evt, $task)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(evt) => onClickRemoveTaskButton(evt, $task)}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        ) : null}
      </ListItem>
    </React.Fragment>
  </CSSTransition>
);
/* eslint-enable */

function TaskList(props) {
  const {
    onClickTask,
    onClickEditTaskButton,
    onClickRemoveTaskButton,
    $tasks,
    isEditable,
    onClickSwitchButton,
  } = props;

  const withStopEvtPropagation = useCallback(
    callback => (evt, ...args) => {
      evt.stopPropagation();
      callback(...args);
    },
    [],
  );

  const subHeader = (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div className="left">
        <Typography>任务列表</Typography>
      </div>
      <div className="right">
        <Typography>
          {'编辑'}
          <SwitchButton onClick={onClickSwitchButton} checked={isEditable} color="primary" />
        </Typography>
      </div>
    </div>
  );

  return (
    <List title={subHeader}>
      <Divider />
      <TransitionGroup className={slowFade}>
        {$tasks.map($task => renderTask({
          $task,
          isEditable,
          onClickTask,
          onClickRemoveTaskButton: withStopEvtPropagation(onClickRemoveTaskButton),
          onClickEditTaskButton: withStopEvtPropagation(onClickEditTaskButton),
        }))}
      </TransitionGroup>
    </List>
  );
}

TaskList.propTypes = {
  $tasks: PropTypes.instanceOf(ImmutableList).isRequired,
  onClickTask: PropTypes.func,
  onClickRemoveTaskButton: PropTypes.func,
  onClickEditTaskButton: PropTypes.func,
  onClickSwitchButton: PropTypes.func,
  isEditable: PropTypes.bool,
  // children: PropTypes.element
};

TaskList.defaultProps = {
  onClickTask: () => {
    /*eslint-disable*/
    console.log('onClickTask');
  },
  onClickRemoveTaskButton: () => {
    /*eslint-disable*/
    console.log('onClickRemoveTaskButton');
  },
  onClickEditTaskButton: () => {
    /*eslint-disable*/
    console.log('onClickEditTaskButton');
  },
  onClickSwitchButton: () => {
    /*eslint-disable*/
    console.log('onClickSwitchButton');
  },
  isEditable: false,
  // children: <div>default menu content</div>
};

export default TaskList;