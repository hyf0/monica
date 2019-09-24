import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Proptypes from 'prop-types';
// import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { showSideMenu } from '../../store/actions';
import { COLOR_BLUE } from '../../utils/constants';
import CompleteTaskButtonContainer from '../CompleteTaskButtonContainer';

import EdtingTaskButtonContainer from '../EdtingTaskButtonContainer';
import HomeButton from '../../components/HomeButton';

const StartOneTaskButton = (props) => {
  const { onClick } = props;
  return (
    <Button
      style={{ backgroundColor: COLOR_BLUE, color: '#fff' }}
      size="medium"
      fullWidth
      // variant="outlined"
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      {'开始一项任务'}
    </Button>
  );
};

StartOneTaskButton.propTypes = {
  onClick: Proptypes.func.isRequired,
};

function AppBarContainer(props) {
  const { dispatch, history } = props;
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
            <Route path="/edit/:id" component={EdtingTaskButtonContainer} />
            <Route path="/todo" component={CompleteTaskButtonContainer} />
            <Route
              render={() => (
                <StartOneTaskButton onClick={onClickStartOneTaskButton} />
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
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
  // $currentTaskItems: Proptypes.instanceOf(List),
};

AppBarContainer.defaultProps = {
  // $currentTaskItems: new List(),
};

const mapState = ($state) => ({
  $currentTaskItems: $state.getIn(['global', '$currentTask', '$items']),
});
export default connect(
  mapState,
  null,
)(withRouter(AppBarContainer));
