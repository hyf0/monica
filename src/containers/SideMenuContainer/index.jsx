import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideSideMenu } from '../../store/actions';

import TaskListContainer from '../TaskListContainer';
import MenuListContainer from '../MenuListContainer';
import Drawer from '../../components/Drawer';
import Mask from '../../components/Mask';

function SideMenuContainer(props) {
  const { dispatch, showSideMenu } = props;
  const onClickSideMenuMask = useCallback(() => {
    dispatch(hideSideMenu());
  }, [dispatch]);

  return (
    <>
      <Mask show={showSideMenu} onClick={onClickSideMenuMask} />
      <Drawer show={showSideMenu}>
        <TaskListContainer />
        <MenuListContainer />
      </Drawer>
    </>
  );
}

SideMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
};

// SideMenuContainer.defaultProps = {
//   showSideMenu: true,
// };

const mapState = ($state) => ({
  showSideMenu: $state.getIn(['global', 'showSideMenu']),
});

export default connect(
  mapState,
  null,
)(SideMenuContainer);
