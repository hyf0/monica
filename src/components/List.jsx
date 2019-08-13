import React from 'react';
import List from '@material-ui/core/List';
import { ListSubheader } from '@material-ui/core';
import PropTypes from 'prop-types';

function ListWrapper(props) {
  const { title, children } = props;

  const subsubheader = title === '' ? null : (
    <ListSubheader component="div" id="nested-list-subheader">
      {title}
    </ListSubheader>
  );

  return (
    <div>
      <List
        style={{
          width: '100%',
        }}
        component="nav"
        // aria-label="secondary mailbox folders"
        subheader={subsubheader}
      >
        {children}
      </List>
    </div>
  );
}

ListWrapper.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

ListWrapper.defaultProps = {
  title: '',
  children: <div>default props</div>,
};

export default ListWrapper;
