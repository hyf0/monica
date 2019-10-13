import React, { useCallback, useState } from 'react';
import { Drawer, Button, ButtonGroup, List, ListItem, Divider, ListSubheader, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './index.scss';
import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';
import { globalActions, userActions } from '../../store/action';
import ProjectList from '../ProjectList';
import { projectEffects } from '../../store/effects';

const commonLayoutSelector = ({ global: { isShowAsideMenu }, user: { user } }: IReduxState) => ({
  isLogined: user != null,
  isShowAsideMenu,
});

export default function AsideMenu() {
  const { isShowAsideMenu, isLogined } = useShallowEqualSelector(commonLayoutSelector);
  const dispatch = useDispatch();
  const hideAsideMenu = useCallback(() => {
    dispatch(globalActions.createSetIsShowAsideMenu(false));
  }, [dispatch]);
  const history = useHistory();
  const handleClickLoginButton = useCallback(() => {
    history.push('/login');
    hideAsideMenu();
  }, [hideAsideMenu, history]);
  const handleClickRegisterButton = useCallback(() => {
    history.push('/register');
    hideAsideMenu();
  }, [hideAsideMenu, history]);

  const handleLogoutButton = useCallback(() => {
    history.push('/');
    dispatch(userActions.createSetUser(null));
  }, [dispatch, history]);

  const [projectName, setProjectName] = useState('');

  const updateProjectName = useCallback((evt: any) => setProjectName(evt.target.value), [setProjectName]);

  const createProject = useCallback(() => {
    if (projectName.trim() === '') return;
    dispatch(projectEffects.createProject({ name: projectName }));
    setProjectName('');
  }, [projectName, setProjectName, dispatch]);

  const handleKeyEnterUp = useCallback((evt: any) => {
    const KEY_ENTER_CODE = 13;
    const { keyCode: keyUp = -1 } = evt;
    if (keyUp === KEY_ENTER_CODE) {
      createProject();
    }
  }, [createProject]);

  

  return (
    <Drawer className="aside-menu-wrapper" anchor="left" onClose={hideAsideMenu} open={isShowAsideMenu}>
      <div className="aside-menu">
        <div className="aside-menu-project-list">
          <ProjectList />
        </div>
        <Divider />
        <List subheader={<ListSubheader>功能</ListSubheader>} className="aside-menu-functions">
          <ListItem>
            <TextField
              label={isLogined ? '创建新任务' : '请先登录'}
              disabled={!isLogined}
              onKeyUp={handleKeyEnterUp}
              onChange={updateProjectName}
              type="text"
              value={projectName}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </ListItem>
          <ListItem>
            {isLogined ? (
              <Button fullWidth variant="outlined" onClick={handleLogoutButton}>
                退出登录
              </Button>
            ) : (
              <ButtonGroup fullWidth>
                <Button variant="outlined" onClick={handleClickLoginButton}>
                  登录
                </Button>
                <Button variant="outlined" onClick={handleClickRegisterButton}>
                  注册
                </Button>
              </ButtonGroup>
            )}
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
