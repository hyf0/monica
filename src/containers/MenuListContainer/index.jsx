import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import MenuList from '../../components/MenuList';
import { uniqueId, normalize } from '../../utils';
import { taskActions } from '../../store/actions';

function MenuListContainer(props) {
  const { dispatch } = props;

  const onCreateTask = useCallback(
    (taskTitle) => {
      dispatch(
        taskActions.addTaskToTasks(
          fromJS({
            title: taskTitle,
            id: uniqueId(),
            items: normalize([]),
          }),
        ),
      );
    },
    [dispatch],
  );
  return <MenuList onCreateTask={onCreateTask} />;
}

MenuListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapState = () => ({});

export default connect(
  mapState,
  null,
)(MenuListContainer);
