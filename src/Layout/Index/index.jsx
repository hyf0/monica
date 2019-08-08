import React, { useCallback } from 'react';
import AppBar from '../../components/AppBar';
// import Home from '../../containers/Home';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { showSideMenu } from '../../store/actions';
import SideMenuContainer from '../../containers/SideMenuContainer';

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    children: PropTypes.node
};

Index.defaultProps = {
    dispatch: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    children: ''
};

function Index(props) {
    const { dispatch } = props;
    const onClickMenuButton = useCallback(() => {
        dispatch(showSideMenu());
    }, [dispatch]);

    return (
        <div
            className={css`
                position: relative;
                height: 100vh;
                display: flex;
                flex-flow: column nowrap;
            `}
        >
            <div
                className={css`
                    position: relative;
                    flex: 1;
                `}
            >
                {props.children}
            </div>
            <AppBar
                className={css`
                    flex: 0 0 60px;
                `}
                onClickMenuButton={onClickMenuButton}
            />
            {props.showSideMenu ? <SideMenuContainer /> : null}
        </div>
    );
}

const mapState = ({ showSideMenu }) => ({
    showSideMenu
});

export default connect(
    mapState,
    null
)(Index);
