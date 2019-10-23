import React, { useCallback } from 'react';
import Header from '../Header';
import { useHistory, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { IReduxState } from '../../store/reducers';
import { Color } from '../../util/constants';
import { userEffects } from '../../store/effects';
import { useShallowEqualSelector } from '../../util/hooks';

import './index.scss';

const accountSelector = ({ user: { user } }: IReduxState) => ({
  user,
});

export default function AccountPage() {
  const history = useHistory();

  const { user } = useShallowEqualSelector(accountSelector);

  const jumpToPrevPage = useCallback(() => {
    history.goBack();
  }, [history]);

  const dispatch = useDispatch();
  // 退出相关
  const handleLogoutButton = useCallback(() => {
    dispatch(userEffects.logout());
  }, [dispatch]);

  if (user == null) return <Redirect to="/" />;

  return (
    <div className="account-page">
      <Header onBack={jumpToPrevPage} title="账户" />
      <div className="account-page-content">
        <div className="text">欢迎您，{user.username}</div>
        <br />
        <Button
          onClick={handleLogoutButton}
          variant="contained"
          style={{
            backgroundColor: Color.RED,
            color: '#fff',
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
