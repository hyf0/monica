import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListSubheader } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

ListWrapper.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};

ListWrapper.defaultProps = {
    title: '',
    children: <div>default props</div>
};

export default function ListWrapper(props) {
    const { title } = props;

    const classes = useStyles();

    const subsubheader =
        title === '' ? null : (
            <ListSubheader component="div" id="nested-list-subheader">
                {title}
            </ListSubheader>
        );

    return (
        <div className={classes.root}>
            <List
                component="nav"
                // aria-label="secondary mailbox folders"
                subheader={subsubheader}
            >
                {props.children}
            </List>
        </div>
    );
}
