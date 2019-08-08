import { constants } from '.';

import { uniqueId } from '../helper';

const defaultState = {
    showSideMenu: false,
    tasks: [
        {
            id: uniqueId(),
            title: '中午去吃饭',
            items: [
                {
                    title: '带伞',
                    checked: false
                },
                {
                    title: '饭卡',
                    checked: false
                },
                {
                    title: '手机',
                    checked: false
                }
            ]
        },
        {
            id: uniqueId(),
            title: 'task2',
            items: []
        }
    ]
};

const reducer = (state = defaultState, action) => {
    if (typeof action.type === 'undefined') {
        throw new Error(`${action} does not has type`);
    }
    switch (action.type) {
        case constants.SHOW_SIDE_MENU: {
            return {
                ...state,
                showSideMenu: true
            };
        }
        case constants.HIDE_SIDE_MENU: {
            return {
                ...state,
                showSideMenu: false
            };
        }
        case constants.CREATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            };
        }
        default:
            return state;
    }
};

export default reducer;
