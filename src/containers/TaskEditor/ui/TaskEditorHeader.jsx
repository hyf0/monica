import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';

import './TaskEditorHeader.scss';

import TextFieldOnKeyEnterUp from '../../../components/TextFieldOnKeyEnterUp';

const TaskEditorHeader = React.memo(function TaskEditorHeader(props) {
  const {
    title,
    onChange,
  } = props;
  return (
    <ListItem id="task-editor-header" dense>
      <TextFieldOnKeyEnterUp
        value={title}
        id="task-editor-task-title-input"
        onChange={onChange}
        onKeyEnterUp={onChange}
        placeholder="任务标题"
      />
    </ListItem>
  );
});

TaskEditorHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TaskEditorHeader;
