import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import MenuList from './ui/MenuList';
import TextFieldOnKeyEnterUp from '../../components/TextFieldOnKeyEnterUp';

import { uniqueId } from '../../utils';
import { globalActions, effectActions } from '../../store/actions';
import { COLOR_GREEN, COLOR_ORANGE } from '../../utils/constants';

const hasLoginSelector = $state => $state.getIn(['user', 'hasLogin']);

function MenuListContainer() {
  const hasLogin = useSelector(hasLoginSelector);

  const dispatch = useDispatch();

  const history = useHistory();

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
      history.push('/account');
    },
    [dispatch],
  );

  return (
    <MenuList>
      <TextFieldOnKeyEnterUp
        label={hasLogin ? '创建新任务' : '请先登录'}
        disabled={!hasLogin}
        onKeyEnterUp={handleEnterUp}
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
  // dispatch: PropTypes.func.isRequired,
  // hasLogin: PropTypes.bool.isRequired,
};


export default MenuListContainer;
