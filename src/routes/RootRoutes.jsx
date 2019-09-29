import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// import { Route, useHistory, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';

// const hasLoginSelector = $state => $state.getIn(['global', 'hasLogin']) || false;

function RootRoutes() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/account" component={AccountPage} />
    </>
  );
}

export default RootRoutes;
