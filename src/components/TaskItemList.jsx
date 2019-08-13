import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { css } from 'emotion';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Map } from 'immutable';
import { uniqueId } from '../utils';

const slowFade = css`
  .slow-fade-enter {
    opacity: 0;
  }
  .slow-fade-enter-active {
    opacity: 1;
    transition: all 300ms ease-out;
  }
  .slow-fade-exit {
    opacity: 1;
  }
  .slow-fade-exit-active {
    opacity: 0;
    transition: all 300ms ease-out;
  }
`;

function TaskItemList(props) {
  const {
    $task, onCreateNewTaskItem, onClickRemoveButton, isEditable, onClickCheckbox,
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

  return (
    <List>
      <ListItem dense>
        <Typography variant="h4" gutterBottom>
          {$task.get('title')}
        </Typography>
      </ListItem>
      <TransitionGroup className={slowFade}>
        {$task.get('$items').map($item => (
          <CSSTransition key={$item.get('id')} timeout={300} classNames="slow-fade">
            <React.Fragment key={$item.get('id')}>
              <ListItem>
                <Checkbox
                  onClick={() => onClickCheckbox($item)}
                  edge="start"
                  checked={$item.get('checked')}
                />
                <ListItemText primary={$item.get('title')} />
                {isEditable ? (
                  <IconButton onClick={() => onClickRemoveButton($item)}>
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </ListItem>
              <Divider variant="middle" />
            </React.Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {isEditable ? (
        <ListItem button>
          <Input
            value={newTaskItemTitle}
            onKeyUp={onKeyEnterUp}
            onChange={onInputNewTaskItem}
            placeholder="新增待做事项"
            fullWidth
          />
        </ListItem>
      ) : null}
    </List>
  );
}

TaskItemList.propTypes = {
  $task: PropTypes.instanceOf(Map).isRequired,
  onCreateNewTaskItem: PropTypes.func,
  onClickRemoveButton: PropTypes.func,
  isEditable: PropTypes.bool,
  onClickCheckbox: PropTypes.func,
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
  isEditable: false,
};

export default TaskItemList;

// export default TaskItemList;