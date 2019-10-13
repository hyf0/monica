import React, { useCallback, useState } from 'react';
import { TextField, Grow, Button } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';
import Header from '../Header';

export default function RegisterPage() {
  // 页面退回相关
  const history = useHistory();
  const [isExiting, setIsExiting] = useState(false);
  const startExitTransition = useCallback(() => setIsExiting(true), [setIsExiting]);
  const backToPrevPage = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Grow in={!isExiting} onExited={backToPrevPage}>
      <div id="register-page">
        <Header onBack={startExitTransition} title="注册" />

        <div className="login-area">
          <TextField
            fullWidth
            // error={isPhoneNumberInputError}
            // value={phoneNumber}
            // onChange={updatePhoneNumber}
            type="number"
            label="手机号"
            margin="normal"
          />
          <TextField
            // error={isPassWordInputError}
            // value={password}
            // onChange={updatePassword}
            fullWidth
            type="text"
            label="密码"
            margin="normal"
          />
          <br />
          <br />
          <Button fullWidth variant="outlined">
            注册
          </Button>
        </div>
      </div>
    </Grow>
  );
}
