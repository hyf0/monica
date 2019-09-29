import React, { useCallback } from 'react';
// import Proptypes from 'prop-types';
// import MoreIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { showSideMenu } from '../../store/actions';
// import { COLOR_BLUE } from '../../utils/constants';
import CompleteTaskButtonContainer from '../CompleteTaskButton';

import TaskEditorButton from '../TaskEditorButton';
import StartTaskButton from './ui/StartTaskButton';
import { COLOR_ORANGE } from '../../utils/constants';
import FullScreenLoading from '../../components/FullScreenLoading';

const hasLoginSelector = $state => $state.getIn(['user', 'hasLogin']);
const isLoginingSelecotr = $state => $state.getIn(['user', 'isLogining']);

function AppBarButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const hasLogin = useSelector(hasLoginSelector);
  const isLogining = useSelector(isLoginingSelecotr);

  const onClickStartOneTaskButton = useCallback(() => {
    dispatch(showSideMenu());
  }, [dispatch]);

  const jumpToLoginPage = useCallback(() => {
    history.push('/account');
  }, []);

  if (isLogining) return <FullScreenLoading />;

  if (!hasLogin) {
    return (
      <Button
        style={{
          backgroundColor: COLOR_ORANGE,
          color: '#fff',
        }}
        size="medium"
        fullWidth
        onClick={jumpToLoginPage}
      >
        登录
      </Button>
    );
  }

  return (
    <Switch>
      <Route path="/edit/:id" component={TaskEditorButton} />
      <Route path="/todo" component={CompleteTaskButtonContainer} />
      <Route
        render={() => (
          <StartTaskButton onClick={onClickStartOneTaskButton} />
        )}
      />
    </Switch>
  );
}
AppBarButton.propTypes = {

};

AppBarButton.defaultProps = {
};


export default AppBarButton;
