
import React from 'react';
import Button from '@material-ui/core/Button';
import Proptypes from 'prop-types';

import { COLOR_BLUE } from '../../../utils/constants';

function StartTaskButton(props) {
  const { onClick } = props;
  return (
    <Button
      style={{ backgroundColor: COLOR_BLUE, color: '#fff' }}
      size="medium"
      fullWidth
      // variant="outlined"
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      {'开始一项任务'}
    </Button>
  );
}


StartTaskButton.propTypes = {
  onClick: Proptypes.func.isRequired,
};

export default StartTaskButton;
