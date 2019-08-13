import React, { useCallback, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

import List from './List';

function MenuList(props) {
  const { onCreateTask } = props;
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onInputCreateTask = useCallback((evt) => {
    setNewTaskTitle(evt.target.value);
  }, []);

  const onKeyEnterUp = useCallback(
    (evt) => {
      const KEY_ENTER = 13;
      const { keyCode: keyUp = -1 } = evt;
      if (newTaskTitle.length !== 0 && keyUp === KEY_ENTER) {
        onCreateTask(newTaskTitle);
        setNewTaskTitle('');
      }
    },
    [newTaskTitle, setNewTaskTitle, onCreateTask],
  );
  return (
    <List title="菜单项">
      <Divider />
      <ListItem button>
        <TextField
          label="创建新任务"
          // className={classes.textField}
          onChange={onInputCreateTask}
          onKeyUp={onKeyEnterUp}
          type="text"
          value={newTaskTitle}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </ListItem>
    </List>
  );
}

MenuList.propTypes = {
  onCreateTask: PropTypes.func,
};

MenuList.defaultProps = {
  onCreateTask: () => {
    /*eslint-disable*/
    console.log('onCreateTask');
  },
};

export default MenuList;
