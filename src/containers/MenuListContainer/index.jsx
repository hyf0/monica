import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import MenuList from '../../components/MenuList';
import { uniqueId } from '../../utils';
import { createNewTask } from '../../store/actions';

function MenuListContainer(props) {
  const { dispatch } = props;

  const onCreateTask = useCallback(
    (taskTitle) => {
      dispatch(
        createNewTask(
          Map({
            title: taskTitle,
            id: uniqueId(),
            $items: new List(),
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
