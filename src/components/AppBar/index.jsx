import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Proptypes from 'prop-types';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';

import MenuButton from '../MenuButton';

function AppBarWrapper(props) {
  const { className, onClickMenuButton } = props;
  return (
    <AppBar
      style={{
        backgroundColor: 'white',
      }}
      className={className}
      position="static"
    >
      <Toolbar>
        <MenuButton onClick={onClickMenuButton} color="black" />
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
          开始一项任务
        </Fab>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
AppBarWrapper.propTypes = {
  onClickMenuButton: Proptypes.func,
  className: Proptypes.string,
};

AppBarWrapper.defaultProps = {
  onClickMenuButton: () => {},
  className: '',
};
export default AppBarWrapper;
