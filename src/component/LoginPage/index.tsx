import React, { useCallback, useState } from 'react';
import { TextField, Grow, Button } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userEffects, globalEffects } from '../../store/effects';

import './index.scss';
import Header from '../../component/Header';
import { useIsLogined } from '../../hook';
import { NotificationType } from '../../util/constants';

function usernameValidator(username: string) {
  //用户名正则，4到16位（字母，数字，下划线，减号）
  const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
  return pattern.test(username);
}

function passwordValidator(password: string) {
  //密码正则，4到16位（字母，数字，下划线，减号）
  const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
  return pattern.test(password);
}

export default function LoginPage() {
  // 页面退回相关
  const history = useHistory();
  const [isExiting, setIsExiting] = useState(false);
  const startExitTransition = useCallback(() => setIsExiting(true), [
    setIsExiting,
  ]);
  const backToPrevPage = useCallback(() => {
    history.goBack();
  }, [history]);

  // 登录相关
  // phonenumber
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isUsernameError, setIsUsernameError] = useState(false);
  const updatePhoneNumber = useCallback(
    evt => {
      setIsUsernameError(false);
      setUsername(evt.target.value);
    },
    [setIsUsernameError, setUsername],
  );
  // password
  const [password, setPassword] = useState('');
  const [isPassWordInputError, setIsPassWordInputError] = useState(false);
  const updatePassword = useCallback(evt => {
    setIsPassWordInputError(false);
    setPassword(evt.target.value);
  }, []);
  const onClickLoginButton = useCallback(() => {
    if (!usernameValidator(username)) {
      dispatch(
        globalEffects.pushNotification({
          type: NotificationType.WARN,
          title: '用户名格式错误',
          detail: '请输入4到16位（字母，数字，下划线，减号）',
        }),
      );
      setIsUsernameError(true);
    } else if (!passwordValidator(password)) {
      dispatch(
        globalEffects.pushNotification({
          type: NotificationType.WARN,
          title: '密码格式错误',
          detail: '请输入4到16位（字母，数字，下划线，减号）',
        }),
      );
      setIsPassWordInputError(true);
    } else {
      dispatch(userEffects.login({ username, password }));
    }
  }, [
    username,
    password,
    setIsUsernameError,
    setIsPassWordInputError,
    dispatch,
  ]);
  // onBack={startExitTransition} title="登录"

  // 判断是否已经登录
  const isLoinged = useIsLogined();
  if (isLoinged) return <Redirect to="/" />;

  return (
    <Grow in={!isExiting} onExited={backToPrevPage}>
      <div id="login-page">
        <Header onBack={startExitTransition} title="登录" />
        <div className="login-area">
          <form>
            <TextField
              fullWidth
              placeholder="请输入4到16位（字母，数字，下划线，减号）"
              error={isUsernameError}
              value={username}
              onChange={updatePhoneNumber}
              type="text"
              label="用户名"
              margin="normal"
            />
            <TextField
              placeholder="请输入4到16位（字母，数字，下划线，减号）"
              error={isPassWordInputError}
              value={password}
              onChange={updatePassword}
              fullWidth
              type="password"
              label="密码"
              margin="normal"
            />
            <br />
            <br />
            <Button onClick={onClickLoginButton} fullWidth variant="outlined">
              登录
            </Button>
          </form>
        </div>
      </div>
    </Grow>
  );
}
