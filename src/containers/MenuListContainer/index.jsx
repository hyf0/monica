import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import MenuList from '../../components/MenuList';
import { uniqueId } from '../../utils';
import { globalActions, effectActions } from '../../store/actions';
import TextInput from '../../components/TextInput';
import { COLOR_GREEN, COLOR_ORANGE } from '../../utils/constants';

function MenuListContainer(props) {
  const { dispatch, hasLogin } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTaskInputChange = useCallback(
    (evt) => setNewTaskTitle(evt.target.value),
    [setNewTaskTitle],
  );

  const handleEnterUp = useCallback(
    function createNewTaskByTitle(evt) {
      const title = evt.target.value.trim();
      if (title !== '') {
        const task = {
          title,
          id: uniqueId(),
          items: [],
          timestamp: Date.now(),
        };
        dispatch(effectActions.createTask(task));

        setNewTaskTitle('');
      }
    },
    [dispatch, setNewTaskTitle],
  );

  const handleClickLoginBtn = useCallback(
    function showLoginAndRegisterModel() {
      dispatch(globalActions.hideSideMenu());
      dispatch(globalActions.showAccountManager());
    },
    [dispatch],
  );

  return (
    <MenuList>
      <TextInput
        label={hasLogin ? '创建新任务' : '请先登录'}
        disabled={!hasLogin}
        onEnter={handleEnterUp}
        onChange={handleCreateTaskInputChange}
        type="text"
        value={newTaskTitle}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <Button
        fullWidth
        variant="outlined"
        style={{
          backgroundColor: hasLogin ? COLOR_GREEN : COLOR_ORANGE,
          color: '#fff',
        }}
        onClick={handleClickLoginBtn}
      >
        {hasLogin ? '已登录' : '登录|云同步'}
      </Button>
    </MenuList>
  );
}

MenuListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasLogin: PropTypes.bool.isRequired,
};

const mapState = ($state) => ({
  hasLogin: $state.getIn(['user', 'hasLogin']),
});

export default connect(
  mapState,
  null,
)(MenuListContainer);
