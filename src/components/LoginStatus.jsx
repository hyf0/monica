import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';

function UserInfo(props) {
  const { $userInfo } = props;

  return (
    <List>
      <ListItem>
        已经登录，欢迎您!
      </ListItem>
      <ListItem>
        {`用户名: ${$userInfo.get('username')}`}
      </ListItem>
    </List>
  );
}

UserInfo.propTypes = {
  $userInfo: PropTypes.instanceOf(Map).isRequired,
};

UserInfo.defaultProps = {};

export default UserInfo;
