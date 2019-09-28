import React, { useState, useCallback, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Map } from 'immutable';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';


import LoginArea from './components/LoginArea';
import RegisterArea from './components/RegisterArea';
import LoginStatus from './components/LoginStatus';
import { globalActions, userActions } from '../../store/actions';
import { stopEventPropagation, uniqueId } from '../../utils';

const usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
const passwordPattern = /^[a-zA-Z0-9_-]{4,16}$/;

function AccountManagerContainer(props) {
  const {
    dispatch,
    hasLogin,
    $userInfo,
    isLogining,
    isRegistering,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const history = useHistory();

  const [isShow, setIsShow] = useState(true);

  const handleClickMask = useCallback(() => {
    setIsShow(false);
  }, [setIsShow]);

  const afterExitTransition = useCallback(() => {
    history.push('/');
  }, []);

  const handleTabChange = useCallback((evt, tabIndexChangedTo) => {
    setTabIndex(tabIndexChangedTo);
  }, []);

  const handleLogin = useCallback(
    (userInfo) => {
      const { username = '', password = '' } = userInfo;
      if (usernamePattern.test(username) && passwordPattern.test(password)) {
        dispatch(userActions.effectLogin(userInfo));
      } else {
        dispatch(
          globalActions.addOneNitification({
            type: 'error',
            title: '登录失败',
            detail: '非法用户名或密码，请输入4到16位的字母或数字',
            key: uniqueId('notify'),
          }),
        );
      }
    },
    [dispatch],
  );

  const handleRegister = useCallback(
    (userInfo) => {
      const { username = '', password = '' } = userInfo;
      if (usernamePattern.test(username) && passwordPattern.test(password)) {
        dispatch(userActions.effectRegister(userInfo));
      } else {
        dispatch(
          globalActions.addOneNitification({
            type: 'error',
            title: '注册失败',
            detail: '非法用户名或密码，请输入4到16位的字母或数字',
            key: uniqueId('notify'),
          }),
        );
      }
    },
    [dispatch],
  );

  const handleClickLogoutButton = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const loginArea = useMemo(
    () => <LoginArea disabled={isLogining} onLogin={handleLogin} />,
    [isLogining, handleLogin],
  );
  const registerArea = useMemo(
    () => <RegisterArea disabled={isRegistering} onRegister={handleRegister} />,
    [handleRegister, isRegistering],
  );

  const tabContentItems = [loginArea, registerArea];

  return (
    <Fade in={isShow} onExited={afterExitTransition}>
      <div
        className="AccountManager"
        onClick={handleClickMask}
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          zIndex: '3000',
          boxSizing: 'border-box',
          padding: '0 50px',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <Paper onClick={stopEventPropagation}>
          {hasLogin ? (
            <>
              <LoginStatus $userInfo={$userInfo} />
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClickLogoutButton}
              >
                退出
              </Button>
            </>
          ) : (
            <>
              <Tabs
                value={tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                centered
              >
                <Tab label="登录" />
                <Tab label="注册" />
              </Tabs>
              <div>{tabContentItems[tabIndex]}</div>
            </>
          )}
        </Paper>
      </div>
    </Fade>
  );
}

AccountManagerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLogining: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  hasLogin: PropTypes.bool.isRequired,
  $userInfo: PropTypes.instanceOf(Map),
};

AccountManagerContainer.defaultProps = {
  $userInfo: null,
};

const mapState = ($state) => ({
  hasLogin: $state.getIn(['user', 'hasLogin']),
  isLogining: $state.getIn(['user', 'isLogining']),
  isRegistering: $state.getIn(['user', 'isRegistering']),
  $userInfo: $state.getIn(['user', 'userInfo']),
});

export default connect(
  mapState,
  null,
)(AccountManagerContainer);
