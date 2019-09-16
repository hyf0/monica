import React from 'react';
import PropTypes from 'prop-types';
import MaterialCheckbox from '@material-ui/core/Checkbox';

function Checkbox(props) {
  return <MaterialCheckbox {...props} />;
}

Checkbox.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  onClick: null,
  checked: false,
  disabled: false,
};

export default Checkbox;
