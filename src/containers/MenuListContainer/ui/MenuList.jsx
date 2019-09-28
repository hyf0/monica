/* eslint-disable react/no-array-index-key */
import React from 'react';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';


function MenuList(props) {
  const { children } = props;
  return (
    <List
      subheader={(
        <ListSubheader component="div">
          菜单项
        </ListSubheader>
      )}
    >
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
