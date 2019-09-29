import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import { Map } from 'immutable';

import TextFieldOnKeyEnterUp from '../../../components/TextFieldOnKeyEnterUp';
import { uniqueId } from '../../../utils';

const TaskItemCreator = React.memo(function TaskItemCreator(props) {
  const {
    onCreateTaskItem,
  } = props;

  const [itemTitle, setItemTitle] = useState('');

  const handleChange = useCallback(evt => setItemTitle(evt.target.value));

  const doOnCreateTaskItem = useCallback(() => {
    if (itemTitle.trim() === '') return;
    const $newTaskItem = Map({
      id: uniqueId(),
      title: itemTitle,
      checked: false,
    });
    onCreateTaskItem($newTaskItem);
    setItemTitle('');
  }, [itemTitle, onCreateTaskItem, setItemTitle]);

  return (
    <ListItem>
      <TextFieldOnKeyEnterUp
        value={itemTitle}
        onKeyEnterUp={doOnCreateTaskItem}
        onChange={handleChange}
        placeholder="新增待做事项"
        fullWidth
      />
    </ListItem>
  );
});

TaskItemCreator.propTypes = {
  onCreateTaskItem: PropTypes.func.isRequired,
};

export default TaskItemCreator;
