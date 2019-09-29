import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import {
  ListItem, Fade, ListItemText, IconButton, Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { TransitionGroup } from 'react-transition-group';

import Checkbox from '../../../components/Checkbox';

const EditableTaskItemList = React.memo(function EditableTaskItemList(props) {
  const {
    $items,
    onClickDeleteButton,
  } = props;
  return (
    <TransitionGroup>
      {$items.map($item => (
        <Fade key={$item.get('id')} timeout={600}>
          <div>
            <ListItem>
              <Checkbox disabled edge="start" checked={$item.get('checked')} />
              <ListItemText primary={$item.get('title')} />
              <IconButton onClick={() => onClickDeleteButton($item)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="middle" />
          </div>
        </Fade>
      ))}
    </TransitionGroup>
  );
});

EditableTaskItemList.propTypes = {
  $items: PropTypes.instanceOf(List).isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default EditableTaskItemList;
