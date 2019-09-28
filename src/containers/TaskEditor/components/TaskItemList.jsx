import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/BorderColor';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Fade from '@material-ui/core/Fade';
import { TransitionGroup } from 'react-transition-group';

import Checkbox from '../../../components/Checkbox';
import { uniqueId } from '../../../utils';

function TaskItemList(props) {
  const {
    $task,
    onCreateNewTaskItem,
    onClickRemoveButton,
    onClickEditButton,
  } = props;
  const [newTaskItemTitle, setNewTaskItemTitle] = useState('');

  const onInputNewTaskItem = useCallback((evt) => {
    setNewTaskItemTitle(evt.target.value);
  }, []);

  const onKeyEnterUp = useCallback(
    (evt) => {
      const KEY_ENTER = 13;
      const { keyCode: keyUp = -1 } = evt;
      const taksItemTitle = evt.target.value;
      if (taksItemTitle.length !== 0 && keyUp === KEY_ENTER) {
        onCreateNewTaskItem(
          Map({
            id: uniqueId(),
            title: taksItemTitle,
            checked: false,
          }),
        );
        setNewTaskItemTitle('');
      }
    },
    [setNewTaskItemTitle, onCreateNewTaskItem],
  );

  const emitTaskId = useCallback(() => {
    onClickEditButton($task.get('id'));
  }, [$task, onClickEditButton]);

  return (
    <List>
      <ListItem dense>
        <Typography variant="h4" gutterBottom>
          {$task.get('title')}
        </Typography>
        <IconButton onClick={emitTaskId}>
          <EditIcon />
        </IconButton>
      </ListItem>
      <TransitionGroup>
        {$task.getIn(['items', 'refs']).map((taskItemId) => {
          const $item = $task.getIn(['items', 'entity', taskItemId]);
          return (
            <Fade key={$item.get('id')} timeout={600}>
              <div>
                <ListItem>
                  <Checkbox disabled edge="start" checked={$item.get('checked')} />
                  <ListItemText primary={$item.get('title')} />
                  <IconButton onClick={() => onClickRemoveButton($item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider variant="middle" />
              </div>
            </Fade>
          );
        })}
      </TransitionGroup>
      <ListItem>
        <Input
          value={newTaskItemTitle}
          onKeyUp={onKeyEnterUp}
          onChange={onInputNewTaskItem}
          placeholder="新增待做事项"
          fullWidth
        />
      </ListItem>
    </List>
  );
}

TaskItemList.propTypes = {
  $task: PropTypes.instanceOf(Map).isRequired,
  onCreateNewTaskItem: PropTypes.func,
  onClickRemoveButton: PropTypes.func,
  onClickEditButton: PropTypes.func,
};

TaskItemList.defaultProps = {
  onCreateNewTaskItem: () => {
    /* eslint-disable */
    console.log('onCreateNewTaskItem');
  },
  onClickRemoveButton: () => {
    /* eslint-disable */
    console.log('onCreateNewTaskItem');
  },
  onClickCheckbox: () => {
    /* eslint-disable */
    console.log('onClickCheckbox');
  },
  onClickEditButton: () => {
    /* eslint-disable */
    console.log('onClickEditButton');
  },
};

export default TaskItemList;

// export default TaskItemList;