import React, { Suspense } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';

import AppBar from '../containers/AppBar';


// import AccountManagerContainer from '../containers/AccountManagerContainer';
import NotificationsPanelContainer from '../containers/NotificationsPanelContainer';
import { useHasBeenTrued } from '../hooks';

const SideMenuContainer = React.lazy(() => import(/* webpackChunkName: "SideMenuContainer", webpackPrefetch: true */ '../containers/SideMenuContainer'));

function CommonLayout(props) {
  const {
    children,
  } = props;

  const isShowSideMenu = useSelector($state => $state.getIn(['global', 'showSideMenu']));

  const hasSideMenuShowed = useHasBeenTrued(isShowSideMenu);

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
        <AppBar />
      </div>
      <NotificationsPanelContainer />
      {hasSideMenuShowed
        ? (
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
