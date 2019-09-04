import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AppBarContainer from '../../containers/AppBarContainer';

import SideMenuContainer from '../../containers/SideMenuContainer';
import TodoListContainer from '../../containers/TodoListContainer';
import HomeContainer from '../../containers/HomeContainer';
import EditingTaskPageContainer from '../../containers/EditingTaskPageContainer';
import AccountManagerContainer from '../../containers/AccountManagerContainer';
import NotificationsPanelContainer from '../../containers/NotificationsPanelContainer';

function Index() {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
      }}
    >
      <div
        style={{
          position: 'relative',
          flex: '1',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Switch>
          <Route path="/todo/:id" component={TodoListContainer} />
          <Route path="/edit/:id" component={EditingTaskPageContainer} />
          <Route component={HomeContainer} />
        </Switch>
      </div>
      <NotificationsPanelContainer />
      <AppBarContainer />
      <SideMenuContainer />
      <AccountManagerContainer />
    </div>
  );
}

// Index.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
//   // children: PropTypes.node,
// };

// Index.defaultProps = {
//   // children: '',
// };

export default Index;
