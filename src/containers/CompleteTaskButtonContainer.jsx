import React, { useCallback, useMemo } from 'react';
import Fab from '@material-ui/core/Fab';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { List, Map } from 'immutable';

import { COLOR_ORANGE, COLOR_GREEN } from '../utils/constants';
import { taskActions } from '../store/actions';

const CompleteTaskButton = (props) => {
  const {
    $tasksItemsEntity, $tasksItemsRefs, dispatch, history,
  } = props;

  const numOfAllTaskItem = $tasksItemsRefs.size;
  const numOfUncheckedItem = useMemo(
    () => $tasksItemsRefs.count(taskId => $tasksItemsEntity.getIn([taskId, 'checked'])),
    [$tasksItemsEntity, $tasksItemsRefs],
  );
  const isAllComleted = numOfAllTaskItem === numOfUncheckedItem;

  const onClickCompleteButton = useCallback(() => {
    if (!isAllComleted) {
      dispatch(taskActions.checkTaskItemInTaskItemsByIndex(numOfUncheckedItem));
    } else {
      /* 全部完成，进行跳转 */
      history.push('/');
    }
  }, [dispatch, isAllComleted, history, numOfUncheckedItem]);

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
  $tasksItemsEntity: Proptypes.instanceOf(Map),
  $tasksItemsRefs: Proptypes.instanceOf(List),
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

CompleteTaskButton.defaultProps = {
  $tasksItemsRefs: new List(),
  $tasksItemsEntity: new Map(),
};

const mapState = ({ $Task }) => ({
  // isEditingTaskEdited: $Task.get('isEditingTaskEdited'),
  $tasksItemsEntity: $Task.getIn(['currentTodoTask', 'items', 'entity']),
  $tasksItemsRefs: $Task.getIn(['currentTodoTask', 'items', 'refs']),
});

export default connect(
  mapState,
  null,
)(CompleteTaskButton);
