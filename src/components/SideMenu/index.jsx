import React, { useCallback, useState } from 'react';
import { css } from 'emotion';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import List from '../List';
import { ListItem, ListItemText, Divider, TextField } from '@material-ui/core';

SideMenu.propTypes = {
    onClickMask: PropTypes.func,
    tasks: PropTypes.array,
    onCreateTask: PropTypes.func,
    onClickTask: PropTypes.func
    // children: PropTypes.element
};

SideMenu.defaultProps = {
    onClickMask: () => {
        /*eslint-disable*/
        console.log('onClickMask');
    },
    onCreateTask: () => {
        /*eslint-disable*/
        console.log('onCreateTask');
    },
    onClickTask: () => {
        /*eslint-disable*/
        console.log('onClickTask');
    }
    // children: <div>default menu content</div>
};

function SideMenu(props) {
    const { onCreateTask, onClickTask } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onInputCreateTask = useCallback(evt => {
        setNewTaskTitle(evt.target.value);
    }, []);

    const onKeyEnterUp = useCallback(
        evt => {
            const KEY_ENTER = 13;
            const { keyCode: keyUp = -1 } = evt;
            if (newTaskTitle.length !== 0 && keyUp === KEY_ENTER) {
                onCreateTask(newTaskTitle);
                setNewTaskTitle('');
            }
        },
        [newTaskTitle, setNewTaskTitle, onCreateTask]
    );

    const stopEvtPropagation = useCallback(evt => {
        evt.stopPropagation();
    }, []);

    const { tasks } = props;
    return (
        <div
            onClick={props.onClickMask}
            className={css`
                position: absolute;
                background-color: rgba(0, 0, 0, 0.2);
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 2000;
            `}
        >
            <div
                onClick={stopEvtPropagation}
                className={css`
                    width: 65%;
                    height: 100%;
                    background-color: #fff;
                    overflow: hidden; /* 防止子margin-top影响父margin-top */
                `}
            >
                <List title="任务列表">
                    <Divider />
                    {tasks.map(task => (
                        <Link key={task.id} to={`/edit/${task.id}`}>
                            <ListItem onClick={onClickTask} button>
                                <ListItemText primary={task.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <List title="菜单项">
                    <Divider />
                    <ListItem button>
                        <TextField
                            label="创建新任务"
                            // className={classes.textField}
                            onChange={onInputCreateTask}
                            onKeyUp={onKeyEnterUp}
                            type="text"
                            value={newTaskTitle}
                            margin="normal"
                            variant="outlined"
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    );
}

export default SideMenu;
