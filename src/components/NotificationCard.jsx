/* eslint-disable react/no-array-index-key */
import React from 'react';

import ErrorIcon from '@material-ui/icons/Clear';
import SuccessIcon from '@material-ui/icons/Done';
import WarnIcon from '@material-ui/icons/PriorityHigh';

import PropTypes from 'prop-types';
import { Card, CardHeader } from '@material-ui/core';

import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '../utils/constants';

const SUCCESS = 'success';
const ERROR = 'error';
const WARN = 'warn';

const TYPE_COLOR_MAPPING = {
  [SUCCESS]: COLOR_GREEN,
  [ERROR]: COLOR_RED,
  [WARN]: COLOR_YELLOW,
};

function NotificationCard(props) {
  const {
    type, title, style, subtitle,
  } = props;
  const iconStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
    color: '#fff',
    width: '48px',
    height: '48px',
    backgroundColor: TYPE_COLOR_MAPPING[type],
  };
  let icon = <WarnIcon style={iconStyle} />;
  if (type === ERROR) icon = <ErrorIcon style={iconStyle} />;
  if (type === SUCCESS) icon = <SuccessIcon style={iconStyle} />;

  return (
    <Card style={style}>
      <CardHeader
        avatar={icon}
        title={title}
        subheader={subtitle}
        // subheader="status: 401"
      />
    </Card>
  );
}

NotificationCard.types = {
  SUCCESS,
  ERROR,
  WARN,
};

NotificationCard.propTypes = {
  type: PropTypes.oneOf([WARN, ERROR, SUCCESS]),
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.string),
};

NotificationCard.defaultProps = {
  type: 'none',
  subtitle: null,
  style: undefined,
};


export default NotificationCard;
