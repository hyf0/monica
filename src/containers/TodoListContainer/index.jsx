import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, Input } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { deepCopy } from '../../helper';

TodoListContainer.propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired
};

export function TodoListContainer(props) {
    const { id: taskId, action, tasks } = props;

    const targetTask = deepCopy(tasks.find(task => task.id === taskId));
    console.log('targetTask', targetTask);
    return (
        <List>
            <ListItem role={undefined} dense button>
                <Typography variant="h4" gutterBottom>
                    {targetTask.title}
                </Typography>
            </ListItem>
            {targetTask.items.map((item, index) => {
                return (
                    <div key={index}>
                        <ListItem role={undefined} dense button>
                            <ListItemIcon>
                                <Checkbox edge="start" />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                        <Divider variant="middle" />
                    </div>
                );
            })}
            <ListItem role={undefined} dense button>
                <Input placeholder="新的待做事项" fullWidth={true} />
            </ListItem>
        </List>
    );
}

const mapState = ({ showSideMenu, tasks }) => ({
    showSideMenu,
    tasks
});

export default connect(
    mapState,
    null
)(TodoListContainer);
