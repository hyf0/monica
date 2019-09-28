import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


import AccountPage from '../pages/AccountPage';
import HomePage from '../pages/HomePage';

function RootRoutes() {
  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/account" component={AccountPage} />
    </>
  );
}

export default RootRoutes;
