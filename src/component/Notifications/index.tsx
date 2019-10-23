/* eslint-disable react/no-array-index-key */
import React from 'react';

import Zoom from '@material-ui/core/Zoom';
import { TransitionGroup } from 'react-transition-group';
import NotificationCard from './ui/NotificationCard';
import { IReduxState } from '../../store/reducers';
import { useShallowEqualSelector } from '../../util/hooks';

const notificationsSelector = ({ global: { notifications } }: IReduxState) => ({
  notifications,
});

function Notifications() {
  const { notifications } = useShallowEqualSelector(notificationsSelector);
  return (
    <>
      <div
        className="NotificationsPanelContainer"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <TransitionGroup>
          {notifications.map((n, index) => (
            <Zoom key={index + n.title}>
              <NotificationCard
                style={{
                  zIndex: '1',
                  backgroundColor: '#fff',
                  margin: '20px 20px 0 20px',
                  position: 'absolute',
                  width: 'calc(100% - 40px)',
                  boxSizing: 'border-box',
                }}
                type={n.type}
                title={n.title}
                detail={n.detail}
              />
            </Zoom>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
}

export default Notifications;
