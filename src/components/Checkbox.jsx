import React from 'react';
import PropTypes from 'prop-types';
import AntdCheckbox from 'antd/es/checkbox';
import 'antd/es/checkbox/style/css.js';

function Checkbox(props) {
  return <AntdCheckbox {...props} />;
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
