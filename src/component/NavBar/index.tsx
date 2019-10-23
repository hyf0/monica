import React, { useCallback } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';
import { globalActions } from '../../store/action';
import HomeButton from '../HomeButton';
import DefaultButton from './DefaultButton';
import TodoProjectButton from './TodoProjectButton';
import TaskEditorButton from './TaskEditorButton';

export default function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickMenuButton = useCallback(() => {
    dispatch(globalActions.createSetIsShowAsideMenu(true));
  }, [dispatch]);

  const onClickHomeButton = useCallback(() => {
    console.log('onClickHomeButton');
    history.push('/');
  }, [history]);

  return (
    <AppBar
      style={{
        backgroundColor: 'white',
      }}
      position="static"
    >
      <Toolbar>
        <IconButton edge="start" onClick={onClickMenuButton}>
          <MenuIcon />
        </IconButton>
        <Switch>
          <Route path="/todo-project" component={TodoProjectButton} />
          <Route path="/project-editor" component={TaskEditorButton} />
          <Route path="*" component={DefaultButton} />
        </Switch>
        <HomeButton needDoubleClick onClick={onClickHomeButton} />
      </Toolbar>
    </AppBar>
  );
}
