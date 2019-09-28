import React, { Suspense } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';

import AppBarContainer from '../containers/AppBarContainer';


// import AccountManagerContainer from '../containers/AccountManagerContainer';
import NotificationsPanelContainer from '../containers/NotificationsPanelContainer';
import { useHasBeenTrued } from '../hooks';

const LazyAccountManagerContainer = React.lazy(() => import('../containers/AccountManagerContainer'));
const SideMenuContainer = React.lazy(() => import(/* webpackChunkName: "SideMenuContainer", webpackPrefetch: true */  '../containers/SideMenuContainer'));

function CommonLayout(props) {
  const {
    children,
  } = props;

  const isShowAccountManager = useSelector($state => $state.getIn(['global', 'showAccountManager']));
  const isShowSideMenu = useSelector($state => $state.getIn(['global', 'showSideMenu']));

  const hasAccountManagerShowed = useHasBeenTrued(isShowAccountManager);
  const hasSideMenuShowed = useHasBeenTrued(isShowSideMenu);

  console.log('isShowAccountManager', isShowAccountManager);
  return (
    <div
      className="CommonLayout"
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
      }}
    >
      <div
        className="CommonLayout-content"
        style={{
          position: 'relative',
          flex: '1',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {children}
      </div>
      <div
        className="CommonLayout-navbar"
        style={{
          flex: '0 0 60px',
        }}
      >
        <AppBarContainer />
      </div>
      <NotificationsPanelContainer />

      {hasAccountManagerShowed
        ?
          (
            <Suspense fallback={null}>
              <LazyAccountManagerContainer />
            </Suspense>
          )
        : null
      }
      {hasSideMenuShowed
        ?
          (
            <Suspense fallback={null}>
              <SideMenuContainer />
            </Suspense>
          )
        : null
      }
    </div>
  );
}

CommonLayout.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  children: Proptypes.node,
};

CommonLayout.defaultProps = {
  children: null,
};

export default CommonLayout;
