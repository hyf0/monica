/* eslint-disable */
import { fromJS, Map } from 'immutable';
/* eslint-enable */

import * as actionTypes from './actionTypes';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  showSideMenu: false,
  showAccountManager: false,
});

/**
 *
 * @param {Map<string, any>} state
 * @param {{type: string, action?: any}} action
 */
const globalReducer = (state = defaultState, action) => {
  // const { type = null, payload = null } = action;
  const { type = null } = action;
  if (type == null) {
    throw new Error(`action: ${action} does not has type!`);
  }
  switch (action.type) {
    case actionTypes.SHOW_SIDE_MENU: {
      return state.set('showSideMenu', true);
    }
    case actionTypes.HIDE_SIDE_MENU: {
      return state.set('showSideMenu', false);
    }
    case actionTypes.SHOW_ACCOUNT_MANAGER: {
      return state.set('showAccountManager', true);
    }
    case actionTypes.HIDE_ACCOUNT_MANAGER: {
      return state.set('showAccountManager', false);
    }
    default:
      return state;
  }
};

export default globalReducer;
