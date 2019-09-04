/* eslint-disable react/no-array-index-key */
import React from 'react';

import ErrorIcon from '@material-ui/icons/Clear';
import SuccessIcon from '@material-ui/icons/Done';
import WarnIcon from '@material-ui/icons/PriorityHigh';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '@material-ui/core';
import { List } from 'immutable';

import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '../utils/constants';

const TYPE_COLOR_MAPPING = {
  success: COLOR_GREEN,
  error: COLOR_RED,
  warn: COLOR_YELLOW,
};

function Notification(props) {
  const {
    type, title, style, subtitle,
  } = props;
  const iconStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
    color: '#fff',
    width: '48px',
    height: '48px',
    backgroundColor: TYPE_COLOR_MAPPING[type],
  };
  let icon = <WarnIcon style={iconStyle} />;
  if (type === 'error') icon = <ErrorIcon style={iconStyle} />;
  if (type === 'success') icon = <SuccessIcon style={iconStyle} />;

  return (
    <Card style={style}>
      <CardHeader
        avatar={icon}
        title={title}
        subheader={subtitle}
        // subheader="status: 401"
      />
    </Card>
  );
}

Notification.propTypes = {
  type: PropTypes.oneOf(['error', 'success', 'warn']),
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.string),
};

Notification.defaultProps = {
  type: 'none',
  subtitle: null,
  style: {},
};

function NotificationsPanelContainer(props) {
  const { $notifications } = props;
  return (
    <>
      <div
        className="NotificationsPanelContainer"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '4000',
          boxSizing: 'border-box',
          padding: '0 20px',
        }}
      >
        {$notifications.map(({
          title, key, detail = null, type = 'warn',
        }) => (
          <Notification
            key={key}
            style={{ marginTop: '20px' }}
            type={type}
            title={title}
            subtitle={detail}
          />
        ))}
      </div>
    </>
  );
}

NotificationsPanelContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // showAccountManager: PropTypes.bool.isRequired,
  // isLogining: PropTypes.bool.isRequired,
  // isRegistering: PropTypes.bool.isRequired,
  // hasLogin: PropTypes.bool.isRequired,
  $notifications: PropTypes.instanceOf(List).isRequired,
};

NotificationsPanelContainer.defaultProps = {};

const mapState = ($state) => ({
  $notifications: $state.getIn(['global', 'notifications']),
  // hasLogin: $state.getIn(['user', 'hasLogin']),
  // isLogining: $state.getIn(['user', 'isLogining']),
  // isRegistering: $state.getIn(['user', 'isRegistering']),
  // $userInfo: $state.getIn(['user', 'userInfo']),
});

export default connect(
  mapState,
  null,
)(NotificationsPanelContainer);
