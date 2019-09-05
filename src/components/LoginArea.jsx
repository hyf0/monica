import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import InputOnEnter from './InputOnEnter';


function LoginArea(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInputUsername = useCallback((evt) => setUsername(evt.target.value), [setUsername]);
  const handleInputPassword = useCallback((evt) => setPassword(evt.target.value), [setPassword]);

  const { onLogin, disabled } = props;

  const isLogining = disabled;

  const tryLogin = useCallback(() => {
    // handleClickButton
    onLogin({
      username,
      password,
    });
  }, [username, password, onLogin]);

  const isDisabled = isLogining || username.trim() === '' || password.trim() === '';

  const buttonText = isLogining ? '登录中...' : '登录';

  return (
    <List>
      <ListItem>
        <TextField value={username} onChange={handleInputUsername} type="text" label="用户名" fullWidth />
      </ListItem>
      <ListItem>
        <InputOnEnter onEnter={tryLogin} value={password} onChange={handleInputPassword} type="password" label="密码" fullWidth />
      </ListItem>
      <ListItem>
        <Button disabled={isDisabled} variant="outlined" onClick={tryLogin} fullWidth>
          {buttonText}
        </Button>
      </ListItem>
    </List>
  );
}

LoginArea.propTypes = {
  onLogin: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

LoginArea.defaultProps = {
  disabled: false,
};


export default LoginArea;
