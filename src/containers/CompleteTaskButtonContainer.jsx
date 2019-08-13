import React, { useCallback, useMemo } from 'react';
import Fab from '@material-ui/core/Fab';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { List } from 'immutable';

import { COLOR_ORANGE, COLOR_GREEN } from '../utils/constants';
import { completeTheFirstUncheckedTaskItem } from '../store/actions';

const CompleteTaskButton = (props) => {
  const { $tasksItems, dispatch, history } = props;

  const numOfAllTaskItem = $tasksItems.size;
  const numOfUncheckedItem = useMemo(
    () => $tasksItems.count($taskItem => $taskItem.get('checked')),
    [$tasksItems],
  );
  const isAllComleted = numOfAllTaskItem === numOfUncheckedItem;

  const onClickCompleteButton = useCallback(() => {
    if (!isAllComleted) {
      dispatch(completeTheFirstUncheckedTaskItem());
    } else {
      /* 全部完成，进行跳转 */
      history.push('/');
    }
  }, [dispatch, isAllComleted, history]);

  const buttonText = isAllComleted
    ? `全部完成(${numOfUncheckedItem}/${numOfAllTaskItem})`
    : `完成一个任务项(${numOfUncheckedItem}/${numOfAllTaskItem})`;

  const buttonColor = isAllComleted ? COLOR_GREEN : COLOR_ORANGE;

  return (
    <Fab
      style={{
        flex: '1',
        backgroundColor: buttonColor,
        color: '#fff',
      }}
      variant="extended"
      size="medium"
      aria-label="add"
      onClick={onClickCompleteButton}
    >
      {buttonText}
    </Fab>
  );
};

CompleteTaskButton.propTypes = {
  $tasksItems: Proptypes.instanceOf(List),
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

CompleteTaskButton.defaultProps = {
  $tasksItems: new List(),
};

const mapState = ({ $global }) => ({
  isEditingTaskEdited: $global.get('isEditingTaskEdited'),
  $tasksItems: $global.getIn(['$currentTask', '$items']),
});

export default connect(
  mapState,
  null,
)(CompleteTaskButton);
