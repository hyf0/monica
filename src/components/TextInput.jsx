import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextInput(props) {

  const { onEnter, ...rest } = props;

  const onKeyEnterUp = useCallback(
    (evt) => {
      const KEY_ENTER = 13;
      const { keyCode: keyUp = -1 } = evt;
      if (keyUp === KEY_ENTER) {
        onEnter(evt);
      }
    },
    [onEnter],
  );

  return <TextField onKeyUp={onKeyEnterUp} {...rest} />;
}

TextInput.propTypes = {
  onEnter: PropTypes.func.isRequired,
};

TextInput.defaultProps = {};

export default TextInput;
