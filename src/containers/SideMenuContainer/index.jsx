import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideSideMenu } from '../../store/actions';

import TaskListContainer from '../TaskListContainer';
import MenuListContainer from '../MenuListContainer';
import RightSlidePage from '../../components/RightSlidePage';

function SideMenuContainer(props) {
  const { dispatch, showSideMenu } = props;
  const onClickSideMenuMask = useCallback(() => {
    dispatch(hideSideMenu());
  }, [dispatch]);

  return (
    <RightSlidePage show={showSideMenu} onClickMask={onClickSideMenuMask}>
      <TaskListContainer />
      <MenuListContainer />
    </RightSlidePage>
  );
}

SideMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
};

// SideMenuContainer.defaultProps = {
//   showSideMenu: true,
// };

const mapState = ({ $global }) => ({
  showSideMenu: $global.get('showSideMenu'),
});

export default connect(
  mapState,
  null,
)(SideMenuContainer);
