import React, { useMemo } from 'react';
import {
  ListItem,
  ListItemText,
  Divider,
  // Typography,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import List from './List';

import { withStopEventtPropagation } from '../utils';

function RecentTaskList(props) {
  const { onClickTask, $tasks, onClickIconButton } = props;

  const onClickIconButtonWithStopEvtPropagation = useMemo(
    () => withStopEventtPropagation(onClickIconButton),
    [onClickIconButton],
  );

  return (
    <List title="最近任务">
      <Divider />
      <TransitionGroup className="transition-fade">
        {$tasks.map($task => (
          <CSSTransition key={$task.get('id')} timeout={300} classNames="fade">
            <React.Fragment>
              <ListItem onClick={() => onClickTask($task)} button>
                <ListItemText primary={$task.get('title')} />
                {$task.get('isPinned') ? null : (
                  <IconButton
                    onClick={evt => onClickIconButtonWithStopEvtPropagation(evt, $task)}
                  >
                    <StarBorderIcon />
                  </IconButton>
                )}
              </ListItem>
            </React.Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
}

RecentTaskList.propTypes = {
  $tasks: PropTypes.instanceOf(ImmutableList).isRequired,
  onClickIconButton: PropTypes.func,
  onClickTask: PropTypes.func,
};

RecentTaskList.defaultProps = {
  onClickTask: () => {
    /*eslint-disable*/
    console.log('onClickTask');
  },
  onClickIconButton: () => {
    /*eslint-disable*/
    console.log('onClickIconButton');
  },
};

export default RecentTaskList;
