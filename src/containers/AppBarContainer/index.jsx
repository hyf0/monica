import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Proptypes from 'prop-types';
// import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { Switch, Route, withRouter } from 'react-router-dom';

import { showSideMenu } from '../../store/actions';
import { COLOR_BLUE } from '../../utils/constants';
import CompleteTaskButtonContainer from '../CompleteTaskButtonContainer';

const SaveChangeButton = () => (
  // const { onClick, isEditingTaskEdited } = props;
  <Fab
    // disabled={!isEditingTaskEdited}
    style={{
      flex: '1',
      // backgroundColor: !isEditingTaskEdited ? COLOR_GREY : COLOR_BLUE,
      color: '#fff',
    }}
    variant="extended"
    size="medium"
    aria-label="add"
  >
    {'占位按钮，已经实现自动保存'}
  </Fab>
);
// SaveChangeButton.propTypes = {
//   onClick: Proptypes.func.isRequired,
//   isEditingTaskEdited: Proptypes.bool.isRequired,
// };

const StartOneTaskButton = (props) => {
  const { onClick } = props;
  return (
    <Fab
      style={{ flex: '1', backgroundColor: COLOR_BLUE, color: '#fff' }}
      variant="extended"
      size="medium"
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      {'开始一项任务'}
    </Fab>
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

  const onClickSaveChangeButton = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('onClickSaveChangeButton');
  }, []);

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
      }}
      className={css`
        flex: 0 0 60px;
      `}
      position="static"
    >
      <Toolbar>
        <IconButton edge="start" onClick={onClickMenuButton}>
          <MenuIcon />
        </IconButton>
        <Switch>
          <Route
            path="/edit"
            render={() => (
              <SaveChangeButton
                // isEditingTaskEdited={isEditingTaskEdited}
                onClick={onClickSaveChangeButton}
              />
            )}
          />
          <Route path="/todo" component={CompleteTaskButtonContainer} />
          <Route render={() => <StartOneTaskButton onClick={onClickStartOneTaskButton} />} />
        </Switch>

        <IconButton onClick={onClickHomeButton} edge="end">
          <HomeIcon />
        </IconButton>
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

const mapState = ({ $global }) => ({
  $currentTaskItems: $global.getIn(['$currentTask', '$items']),
});
export default connect(
  mapState,
  null,
)(withRouter(AppBarContainer));
