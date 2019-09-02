import React, { useState, useCallback, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Map } from 'immutable';

import LoginArea from '../components/LoginArea';
import RegisterArea from '../components/RegisterArea';
import { globalActions, effectActions, userActions } from '../store/actions';
import { stopEventPropagation } from '../utils';
import LoginStatus from '../components/LoginStatus';


function AccountManagerContainer(props) {
  const {
    dispatch,
    showAccountManager,
    hasLogin,
    $userInfo,
    isLogining,
    isRegistering,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleClickMask = useCallback(() => {
    dispatch(globalActions.hideAccountManager());
  }, [dispatch]);

  const handleTabChange = useCallback((evt, tabIndexChangedTo) => {
    setTabIndex(tabIndexChangedTo);
  }, []);

  const handleLogin = useCallback(
    (userInfo) => {
      dispatch(effectActions.login(userInfo));
    },
    [dispatch],
  );

  const handleRegister = useCallback(
    (userInfo) => {
      dispatch(effectActions.register(userInfo));
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

  if (!showAccountManager) return null;

  return (
    <>
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
              <Button fullWidth variant="outlined" onClick={handleClickLogoutButton}>退出</Button>
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
    </>
  );
}

AccountManagerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showAccountManager: PropTypes.bool.isRequired,
  isLogining: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  hasLogin: PropTypes.bool.isRequired,
  $userInfo: PropTypes.instanceOf(Map),
};

AccountManagerContainer.defaultProps = {
  $userInfo: null,
};

const mapState = ($state) => ({
  showAccountManager: $state.getIn(['global', 'showAccountManager']),
  hasLogin: $state.getIn(['user', 'hasLogin']),
  isLogining: $state.getIn(['user', 'isLogining']),
  isRegistering: $state.getIn(['user', 'isRegistering']),
  $userInfo: $state.getIn(['user', 'userInfo']),
});

export default connect(
  mapState,
  null,
)(AccountManagerContainer);
