import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextFieldOnKeyEnterUp(props) {
  const { onKeyEnterUp, ...rest } = props;

  const doOnKeyEnterUp = useCallback(
    (evt) => {
      const KEY_ENTER_CODE = 13;
      const { keyCode: keyUp = -1 } = evt;
      if (keyUp === KEY_ENTER_CODE) {
        onKeyEnterUp(evt);
      }
    },
    [onKeyEnterUp],
  );

  return <TextField onKeyUp={doOnKeyEnterUp} {...rest} />;
}

TextFieldOnKeyEnterUp.propTypes = {
  onKeyEnterUp: PropTypes.func.isRequired,
};

TextFieldOnKeyEnterUp.defaultProps = {};

export default TextFieldOnKeyEnterUp;
