/* eslint-disable react/no-array-index-key */
import React from 'react';

import ErrorIcon from '@material-ui/icons/Clear';
import SuccessIcon from '@material-ui/icons/Done';
import WarnIcon from '@material-ui/icons/PriorityHigh';

import { Card, CardHeader } from '@material-ui/core';
import { Color, NotificationType } from '../../../util/constants';

const SUCCESS = 'success';
const ERROR = 'error';
const WARN = 'warn';

const TYPE_COLOR_MAPPING = {
  [SUCCESS]: Color.GREEN,
  [ERROR]: Color.RED,
  [WARN]: Color.YELLOW,
};

function NotificationCardWithRef(
  props: {
    type?: NotificationType;
    title: string;
    style: any;
    detail?: string;
  },
  ref: any,
) {
  const { type = NotificationType.WARN, title, style, detail = '' } = props;
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
    <Card ref={ref} style={style}>
      <CardHeader
        avatar={icon}
        title={title}
        subheader={detail}
        // subheader="status: 401"
      />
    </Card>
  );
}

const NotificationCard = React.forwardRef(NotificationCardWithRef);

// NotificationCard.types = {
//   SUCCESS,
//   ERROR,
//   WARN,
// };

// NotificationCard.propTypes = {
//   type: PropTypes.oneOf([WARN, ERROR, SUCCESS]),
//   title: PropTypes.node.isRequired,
//   subtitle: PropTypes.node,
//   style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
// };

// NotificationCard.defaultProps = {
//   type: 'none',
//   subtitle: null,
//   style: undefined,
// };

export default NotificationCard;
