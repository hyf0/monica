import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function InputOnEnter(props) {
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

InputOnEnter.propTypes = {
  onEnter: PropTypes.func.isRequired,
};

InputOnEnter.defaultProps = {};

export default InputOnEnter;
