import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


function RegisterArea(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInputUsername = useCallback((evt) => setUsername(evt.target.value), [setUsername]);
  const handleInputPassword = useCallback((evt) => setPassword(evt.target.value), [setPassword]);

  const { onRegister, disabled } = props;

  const handleClickButton = useCallback(() => {
    onRegister({
      username,
      password,
    });
  }, [username, password, onRegister]);

  const isDisabled = disabled || username.trim() === '' || password.trim() === '';

  return (
    <List>
      <ListItem>
        <TextField value={username} onChange={handleInputUsername} type="text" label="用户名" fullWidth />
      </ListItem>
      <ListItem>
        <TextField value={password} onChange={handleInputPassword} type="password" label="密码" fullWidth />
      </ListItem>
      <ListItem>
        <Button disabled={isDisabled} variant="outlined" onClick={handleClickButton} fullWidth>
          注册
        </Button>
      </ListItem>
    </List>
  );
}

RegisterArea.propTypes = {
  onRegister: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

RegisterArea.defaultProps = {
  disabled: false,
};


export default RegisterArea;
