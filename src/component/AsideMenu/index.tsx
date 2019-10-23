import React, { useCallback, useState } from 'react';
import {
  Drawer,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Divider,
  ListSubheader,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './index.scss';
import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';
import { globalActions } from '../../store/action';
import ProjectList from '../ProjectList';
import { projectEffects } from '../../store/effects';
import { useIsLogined } from '../../hook';
import FullScreenLoginTip from '../../ui/FullScreenLoginTip';

const commonLayoutSelector = ({
  user: { user },
  global: { isShowAsideMenu },
}: IReduxState) => ({
  isShowAsideMenu,
  username: user != null ? user.username : '',
});

export default function AsideMenu() {
  const { isShowAsideMenu, username } = useShallowEqualSelector(commonLayoutSelector);
  const isLogined = useIsLogined();
  const dispatch = useDispatch();
  const hideAsideMenu = useCallback(() => {
    dispatch(globalActions.createSetIsShowAsideMenu(false));
  }, [dispatch]);
  const history = useHistory();
  const handleClickLoginButton = useCallback(() => {
    hideAsideMenu();
    history.push('/login');
  }, [hideAsideMenu, history]);
  const handleClickRegisterButton = useCallback(() => {
    hideAsideMenu();
    history.push('/register');
  }, [hideAsideMenu, history]);

  const jumpToAccountPage = useCallback(() => {
    hideAsideMenu();
    history.push('/account');
  }, [hideAsideMenu, history]);

  const [projectName, setProjectName] = useState('');

  const updateProjectName = useCallback(
    (evt: any) => setProjectName(evt.target.value),
    [setProjectName],
  );

  const createProject = useCallback(() => {
    if (projectName.trim() === '') return;
    dispatch(projectEffects.createProject({ name: projectName }));
    setProjectName('');
  }, [projectName, setProjectName, dispatch]);

  const handleKeyEnterUp = useCallback(
    (evt: any) => {
      const KEY_ENTER_CODE = 13;
      const { keyCode: keyUp = -1 } = evt;
      if (keyUp === KEY_ENTER_CODE) {
        createProject();
      }
    },
    [createProject],
  );

  return (
    <Drawer
      className="aside-menu-wrapper"
      anchor="left"
      onClose={hideAsideMenu}
      open={isShowAsideMenu}
    >
      <div className="aside-menu">
        <div className="aside-menu-project-list">
          {isLogined ? <ProjectList /> : <FullScreenLoginTip />}
        </div>
        <Divider />
        <List
          subheader={<ListSubheader>功能</ListSubheader>}
          className="aside-menu-functions"
        >
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
              <Button fullWidth variant="outlined" onClick={jumpToAccountPage}>
                账户({username} 已登录)
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
