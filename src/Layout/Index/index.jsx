import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Switch, Route } from 'react-router-dom';
import AppBarContainer from '../../containers/AppBarContainer';

import SideMenuContainer from '../../containers/SideMenuContainer';
import TodoListContainer from '../../containers/TodoListContainer';
import TaskListContainer from '../../containers/TaskListContainer';

function Index() {
  return (
    <div
      className={css`
        position: relative;
        height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
    >
      <div
        className={css`
          position: relative;
          flex: 1;
          overflow-y: scroll;
          overflow-x: hidden;
        `}
      >
        <Switch>
          <Route path="/:action/:id" component={TodoListContainer} />
          <Route component={TaskListContainer} />
        </Switch>
      </div>
      <AppBarContainer />
      <SideMenuContainer />
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
