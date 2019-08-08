import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import MenuButton from '../MenuButton';
import Proptypes from 'prop-types';

AppBarWrapper.propTypes = {
    onClickMenuButton: Proptypes.func,
    className: Proptypes.string
};

AppBarWrapper.defaultProps = {
    onClickMenuButton: () => {},
    className: ''
};

function AppBarWrapper(props) {
    return (
        <AppBar
            style={{
                backgroundColor: 'white'
            }}
            className={props.className}
            position="static"
        >
            <Toolbar>
                <MenuButton onClick={props.onClickMenuButton} color={'black'} />

                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                >
                    开始一项任务
                </Fab>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarWrapper;
