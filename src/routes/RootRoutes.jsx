import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import TodoListContainer from '../containers/TodoListContainer';
import HomeContainer from '../containers/HomeContainer';
import EditingTaskPageContainer from '../containers/EditingTaskPageContainer';
import CommonLayout from '../layouts/CommonLayout';

function RootRoutes() {
  return (
    <Route
      path="/"
      render={() => (
        <CommonLayout>
          <Switch>
            <Route path="/todo/:id" component={TodoListContainer} />
            <Route path="/edit/:id" component={EditingTaskPageContainer} />
            <Route component={HomeContainer} />
          </Switch>
        </CommonLayout>
      )}
    />
  );
}

// Index.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
//   // children: PropTypes.node,
// };

// Index.defaultProps = {
//   // children: '',
// };

export default RootRoutes;
