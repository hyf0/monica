/* eslint-disable */
import { fromJS, Map } from 'immutable';
/* eslint-enable */

import * as actionTypes from './actionTypes';
import { setLocalJWT } from '../../utils';

/**
 * @type Map<string, any>;
 */
const defaultState = fromJS({
  hasLogin: false,
  userInfo: null,
  isLogining: false,
  isRegistering: false,
});

/**
 *
 * @param {Map<string, any>} state
 * @param {{type: string, action?: any}} action
 */
const userReducer = (state = defaultState, action) => {
  const { type = null, payload = null } = action;
  if (type == null) {
    throw new Error(`action: ${action} does not has type!`);
  }
  switch (action.type) {
    case actionTypes.EFFECT_LOGIN_BY_JWT:
    case actionTypes.EFFECT_LOGIN: {
      return state.set('isLogining', true);
    }
    case actionTypes.EFFECT_REGISTER: {
      return state.set('isRegistering', true);
    }
    case actionTypes.LOGIN_SUCCESS: {
      const loginInfo = payload;
      return state.merge({ hasLogin: true, isLogining: false }, loginInfo);
    }
    case actionTypes.LOGIN_FAIL: {
      return state.set('isLogining', false);
    }
    case actionTypes.LOGOUT: {
      setLocalJWT(''); // 清空本地jwt
      return state.merge({
        hasLogin: false,
        userInfo: null,
        isLogining: false,
        isRegistering: false,
      });
    }
    case actionTypes.REGISTER_SUCCESS: {
      const loginInfo = payload;
      return state.merge({ hasLogin: true, isRegistering: false }, loginInfo);
    }
    case actionTypes.REGISTER_FAIL: {
      return state.set('isRegistering', false);
    }
    default:
      return state;
  }
};

export default userReducer;
