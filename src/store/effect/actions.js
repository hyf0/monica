import * as actionTypes from './actionTypes';

export const createTask = (task) => ({
  type: actionTypes.EFFECT_CREATE_TASK,
  payload: task,
});

export const updateTask = (task) => ({
  type: actionTypes.EFFECT_UPDATE_TASK,
  payload: task,
});
