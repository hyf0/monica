import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Proptypes from 'prop-types';
// import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { showSideMenu } from '../../store/actions';
// import { COLOR_BLUE } from '../../utils/constants';
import CompleteTaskButtonContainer from '../CompleteTaskButton';

import TaskEditorButton from '../TaskEditorButton';
import HomeButton from '../../components/HomeButton';
import StartTaskButton from './ui/StartTaskButton';

function AppBarContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickMenuButton = useCallback(() => {
    dispatch(showSideMenu());
  }, [dispatch]);

  const onClickStartOneTaskButton = useCallback(() => {
    dispatch(showSideMenu());
  }, [dispatch]);

  const onClickHomeButton = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <AppBar
      style={{
        backgroundColor: 'white',
        flex: '0 0 60px',
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
          <Switch>
            <Route path="/edit/:id" component={TaskEditorButton} />
            <Route path="/todo" component={CompleteTaskButtonContainer} />
            <Route
              render={() => (
                <StartTaskButton onClick={onClickStartOneTaskButton} />
              )}
            />
          </Switch>
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
