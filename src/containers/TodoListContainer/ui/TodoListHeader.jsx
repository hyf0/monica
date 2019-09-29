import React from 'react';

import PropTypes from 'prop-types';
// import { Map, List } from 'immutable';
import EditIcon from '@material-ui/icons/BorderColor';
import {
  List, IconButton, ListItem, Typography,
} from '@material-ui/core';

const TodoListHeader = React.memo(function TodoListHeader(props) {
  const {
    title,
    onClickEditButton,
  } = props;

  return (
    <List>
      <ListItem dense>
        <Typography variant="h4">
          {title}
        </Typography>
        <IconButton onClick={onClickEditButton}>
          <EditIcon />
        </IconButton>
      </ListItem>
    </List>
  );
});


TodoListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
};

TodoListHeader.defaultProps = {
};


export default TodoListHeader;
