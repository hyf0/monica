import React, { useCallback, useState } from 'react';
import { TextField, Grow, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userEffects } from '../../store/effects';

import './index.scss';
import Header from '../../component/Header';

function validatePhoneNumber(phoneNumber: string) {
  if (phoneNumber.trim().length > 0) return true;
  return false;
}

function validatePassword(password: string) {
  if (password.trim().length === 0) return false;
  return true;
}

export default function LoginPage() {
  // 页面退回相关
  const history = useHistory();
  const [isExiting, setIsExiting] = useState(false);
  const startExitTransition = useCallback(() => setIsExiting(true), [setIsExiting]);
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
    if (!validatePhoneNumber(username)) {
      setIsUsernameError(true);
    } else if (!validatePassword(password)) {
      setIsPassWordInputError(true);
    } else {
      dispatch(userEffects.login({ username, password }));
    }
  }, [username, password, setIsUsernameError, setIsPassWordInputError, dispatch]);
  // onBack={startExitTransition} title="登录"
  return (
    <Grow in={!isExiting} onExited={backToPrevPage}>
      <div id="login-page">
        <Header onBack={startExitTransition} title="登录" />
        <div className="login-area">
          <TextField
            fullWidth
            error={isUsernameError}
            value={username}
            onChange={updatePhoneNumber}
            type="text"
            label="用户名"
            margin="normal"
          />
          <TextField
            error={isPassWordInputError}
            value={password}
            onChange={updatePassword}
            fullWidth
            type="text"
            label="密码"
            margin="normal"
          />
          <br />
          <br />
          <Button onClick={onClickLoginButton} fullWidth variant="outlined">
            登录
          </Button>
        </div>
      </div>
    </Grow>
  );
}
