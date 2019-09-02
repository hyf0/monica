import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalJWT } from '../utils';
import { userActions, taskActions } from '../store/actions';

function InitWrapperContainer(props) {
  const { children, dispatch, hasLogin } = props;
  useEffect(() => {
    // 自动登录
    const jwt = getLocalJWT();
    if (jwt === '' || jwt == null) return;
    dispatch(userActions.effectGetUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (hasLogin) {
      dispatch(taskActions.effectGetTaskList());
    }
  }, [dispatch, hasLogin]);
  return <>{children}</>;
}

InitWrapperContainer.propTypes = {
  hasLogin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapState = ($state) => ({
  hasLogin: $state.getIn(['user', 'hasLogin']),
});

export default connect(
  mapState,
  null,
)(InitWrapperContainer);
