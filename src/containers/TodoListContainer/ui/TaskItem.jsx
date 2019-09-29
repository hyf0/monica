import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
// import { Map, List } from 'immutable';
import { Map } from 'immutable';
import {
  ListItemText, ListItem, Divider,
} from '@material-ui/core';

import Checkbox from '../../../components/Checkbox';

const TaskItem = React.memo(function TaskItem(props) {
  const { $taskItem, onClick } = props;

  const doOnClick = useCallback(() => onClick($taskItem), [$taskItem, onClick]);

  const isChecked = $taskItem.get('checked');

  const style = {
    opacity: isChecked ? '0.5' : '1',
  };

  return (
    <>
      <ListItem style={style} button onClick={doOnClick}>
        <Checkbox edge="start" checked={isChecked} />
        <ListItemText primary={$taskItem.get('title')} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
});

TaskItem.propTypes = {
  $taskItem: PropTypes.instanceOf(Map).isRequired,
  onClick: PropTypes.func.isRequired,
};

TaskItem.defaultProps = {
};

export default TaskItem;

// export default TodoListContainer;
