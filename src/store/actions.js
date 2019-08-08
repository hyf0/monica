import * as constants from './contants';

export const showSideMenu = () => ({
    type: constants.SHOW_SIDE_MENU
});

export const hideSideMenu = () => ({
    type: constants.HIDE_SIDE_MENU
});

export const createNewTask = task => ({
    type: constants.CREATE_TASK,
    payload: task
});

export const editTask = task => ({
    type: constants.EDIT_TASK,
    payload: task
});

export const removeTask = task => ({
    type: constants.REMOVE_TASK,
    payload: task
});
