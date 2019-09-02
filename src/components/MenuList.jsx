import React from 'react';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import PropTypes from 'prop-types';

import List from './List';

function MenuList(props) {
  const { children } = props;
  return (
    <List title="菜单项">
      <Divider />
      {React.Children.map(children, (node, index) => (
        <ListItem key={index}>{node}</ListItem>
      ))}
    </List>
  );
}

MenuList.propTypes = {
  children: PropTypes.node,
};

MenuList.defaultProps = {
  children: null,
};

export default MenuList;
