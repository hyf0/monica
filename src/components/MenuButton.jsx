import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';

MenuButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func
};

MenuButton.defaultProps = {
    color: 'white',
    onClick: () => {}
};

function MenuButton(props) {
    return (
        <IconButton
            edge="start"
            style={{
                color: props.color
            }}
            aria-label="menu"
            onClick={props.onClick}
        >
            <MenuIcon />
        </IconButton>
    );
}

export default MenuButton;
