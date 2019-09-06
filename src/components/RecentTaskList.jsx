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
      {$tasks.map(($task) => (
        <React.Fragment key={$task.get('id')}>
          <ListItem onClick={() => onClickTask($task)} button>
            <ListItemText primary={$task.get('title')} />
            {$task.get('isPinned') ? null : (
              <IconButton onClick={(evt) => onClickIconButtonWithStopEvtPropagation(evt, $task)}>
                <StarBorderIcon />
              </IconButton>
            )}
          </ListItem>
        </React.Fragment>
      ))}
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
  }
};

export default RecentTaskList;
