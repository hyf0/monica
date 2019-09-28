import * as actionTypes from './actionTypes';

export const showSideMenu = () => ({
  type: actionTypes.SHOW_SIDE_MENU,
});

export const hideSideMenu = () => ({
  type: actionTypes.HIDE_SIDE_MENU,
});

/**
 *
 * @param {{
 *  title: string;
 *  message?: string;
 *  type: 'warn' | 'error' | 'success';
 *  key: string;
 * }} info
 */
export const addOneNitification = (info) => ({
  type: actionTypes.ADD_ONE_NOTIFICATION,
  payload: info,
});

export const removeTheTopNitification = () => ({
  type: actionTypes.REMOVE_THE_TOP_NOTIFICATION,
});
