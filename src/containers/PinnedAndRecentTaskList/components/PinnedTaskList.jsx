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
import Fade from '@material-ui/core/Fade';
import { TransitionGroup } from 'react-transition-group';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import { withStopEventtPropagation } from '../../../utils';


function PinnedTaskList(props) {
  const { onClickTask, $tasks, onClickIconButton } = props;

  const onClickIconButtonWithStopEvtPropagation = useMemo(
    () => withStopEventtPropagation(onClickIconButton),
    [onClickIconButton],
  );

  return (
    <List
      subheader={(
        <ListSubheader component="div">
          置顶任务
        </ListSubheader>
      )}
    >
      <Divider />
      <TransitionGroup>
        {$tasks.map($task => (
          <Fade key={$task.get('id')} timeout={300}>
            <div>
              <ListItem onClick={() => onClickTask($task)} button>
                <ListItemText primary={$task.get('title')} />
                <IconButton onClick={evt => onClickIconButtonWithStopEvtPropagation(evt, $task)}>
                  <StarIcon />
                </IconButton>
              </ListItem>
            </div>
          </Fade>
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
