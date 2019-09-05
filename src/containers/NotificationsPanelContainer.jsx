/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import NotificationCard from '../components/NotificationCard';
import Zoom from '../components/transitions/Zoom';

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
          <Zoom show key={key}>
            <NotificationCard
              style={{ marginTop: '20px' }}
              type={type}
              title={title}
              subtitle={detail}
            />
          </Zoom>
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
