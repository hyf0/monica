import React, { useMemo } from 'react';
import {
  ListItem,
  ListItemText,
  Divider,
  // Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { css } from 'emotion';

import List from './List';

import { withStopEventtPropagation } from '../utils';

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

function PinnedTaskList(props) {
  const { onClickTask, $tasks, onClickIconButton } = props;

  const onClickIconButtonWithStopEvtPropagation = useMemo(
    () => withStopEventtPropagation(onClickIconButton),
    [onClickIconButton],
  );

  return (
    <List title="置顶任务">
      <Divider />
      <TransitionGroup className={slowFade}>
        {$tasks.map($task => (
          <CSSTransition key={$task.get('id')} timeout={600} classNames="slow-fade">
            <React.Fragment>
              <ListItem style={{ height: '48px' }} onClick={() => onClickTask($task)} button>
                <ListItemText primary={$task.get('title')} />
                <IconButton onClick={evt => onClickIconButtonWithStopEvtPropagation(evt, $task)}>
                  <StarIcon />
                </IconButton>
              </ListItem>
            </React.Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
}

PinnedTaskList.propTypes = {
  $tasks: PropTypes.instanceOf(ImmutableList).isRequired,
  onClickIconButton: PropTypes.func,
  onClickTask: PropTypes.func,
};

PinnedTaskList.defaultProps = {
  onClickTask: () => {
    /*eslint-disable*/
    console.log('onClickTask');
  },
  onClickIconButton: () => {
    /*eslint-disable*/
    console.log('onClickIconButton');
  },
};

export default PinnedTaskList;
