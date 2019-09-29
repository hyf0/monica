import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showSideMenu } from '../../store/actions';

import HomeButton from '../../components/HomeButton';
import AppBarButton from './AppBarButton';

function AppBarContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickMenuButton = useCallback(() => {
    dispatch(showSideMenu());
  }, [dispatch]);

  const onClickHomeButton = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <AppBar
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}
      position="static"
    >
      <Toolbar>
        <IconButton edge="start" onClick={onClickMenuButton}>
          <MenuIcon />
        </IconButton>
        <div
          className="appbar-button"
          style={{
            flex: '1',
            padding: '0 5px',
          }}
        >
          <AppBarButton />
        </div>
        <HomeButton needDoubleClick onClick={onClickHomeButton} />
      </Toolbar>
    </AppBar>
  );
}
AppBarContainer.propTypes = {

};

AppBarContainer.defaultProps = {
};


export default AppBarContainer;
