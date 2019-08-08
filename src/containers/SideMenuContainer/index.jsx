import React, { useCallback } from 'react';
// import { css } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideSideMenu, createNewTask } from '../../store/actions';
import SideMenu from '../../components/SideMenu';
import { uniqueId } from '../../helper';

SideMenuContainer.propTypes = {
    onClickMask: PropTypes.func,
    children: PropTypes.element,
    tasks: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

SideMenuContainer.defaultProps = {
    // onClickMask: () => {},
    // children: <div>default menu content</div>
};

function SideMenuContainer(props) {
    const { dispatch, tasks } = props;
    const onClickSideMenuMask = useCallback(() => {
        dispatch(hideSideMenu());
    }, [dispatch]);

    const onCreateTask = useCallback(
        taskTitle => {
            dispatch(
                createNewTask({
                    title: taskTitle,
                    id: uniqueId(),
                    items: []
                })
            );
        },
        [dispatch]
    );

    const onClickTask = useCallback(() => {
        dispatch(hideSideMenu());
    }, [dispatch]);

    return (
        <SideMenu
            onClickTask={onClickTask}
            onCreateTask={onCreateTask}
            tasks={tasks}
            onClickMask={onClickSideMenuMask}
        />
    );
}

const mapState = ({ showSideMenu, tasks }) => ({
    showSideMenu,
    tasks
});

export default connect(
    mapState,
    null
)(SideMenuContainer);
