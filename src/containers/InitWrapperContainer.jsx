import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalJWT } from '../utils';
import { userActions } from '../store/actions';

function InitWrapperContainer(props) {
  const { children } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    // 自动登录
    const jwt = getLocalJWT();
    if (jwt === '' || jwt == null) return;
    dispatch(userActions.effectGetUserInfo());
  }, [dispatch]);


  return <>{children}</>;
}

InitWrapperContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InitWrapperContainer;
