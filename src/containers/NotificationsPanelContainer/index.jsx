/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { List } from 'immutable';

import Zoom from '@material-ui/core/Zoom';
import { TransitionGroup } from 'react-transition-group';
import NotificationCard from './ui/NotificationCard';

const notificationsSelector = $state => $state.getIn(['global', 'notifications']);

function NotificationsPanelContainer() {
  const $notifications = useSelector(notificationsSelector);
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
        <TransitionGroup>
          {$notifications.map(({
            title, key, detail = null, type = 'warn',
          }) => (
            <Zoom key={key}>
              <NotificationCard
                style={{ marginTop: '20px' }}
                type={type}
                title={title}
                subtitle={detail}
              />
            </Zoom>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
}

NotificationsPanelContainer.propTypes = {

};

NotificationsPanelContainer.defaultProps = {};

export default NotificationsPanelContainer;
