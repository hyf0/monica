import React, { useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { List, Map } from 'immutable';

import { COLOR_ORANGE, COLOR_GREEN, COLOR_RED } from '../utils/constants';
import { taskActions } from '../store/actions';

const CompleteTaskButton = (props) => {
  const {
    $task,
    $tasksItemsEntity,
    $tasksItemsRefs,
    dispatch,
    history,
  } = props;

  const $unchckedTaskItems = useMemo(
    () =>
      $tasksItemsRefs
        .filter((taskId) => !$tasksItemsEntity.getIn([taskId, 'checked']))
        .map((taskId) => $tasksItemsEntity.get(taskId)),
    [$tasksItemsEntity, $tasksItemsRefs],
  );
  const numOfAllTaskItem = $tasksItemsRefs.size;
  const numOfUncheckedItem = $unchckedTaskItems.size;
  const numOfCheckedItem = numOfAllTaskItem - numOfUncheckedItem;
  const isAllComleted = numOfAllTaskItem === numOfCheckedItem;
  const hasZeroTaskItem = numOfAllTaskItem === 0;
  const onClickCompleteButton = useCallback(() => {
    if (hasZeroTaskItem) {
      // 零个可完成任务项，提供跳转到编辑页面的快速方式
      history.push(`/edit/${$task.get('id')}`);
    } else if (isAllComleted) {
      /* 所有任务项全部完成，跳转到APP主页 */
      history.push('/');
    } else {
      dispatch(
        taskActions.checkTaskItemInTaskItemsByTaskId(
          $unchckedTaskItems.getIn(['0', 'id']),
        ),
      );
    }
  }, [
    $task,
    hasZeroTaskItem,
    isAllComleted,
    $unchckedTaskItems,
    history,
    dispatch,
  ]);

  let buttonText;
  let buttonColor;
  if (hasZeroTaskItem) {
    buttonText = '添加任务项';
    buttonColor = COLOR_RED;
  } else if (isAllComleted) {
    buttonText = `全部完成(${numOfCheckedItem}/${numOfAllTaskItem})`;
    buttonColor = COLOR_GREEN;
  } else {
    buttonText = `完成一个任务项(${numOfCheckedItem}/${numOfAllTaskItem})`;
    buttonColor = COLOR_ORANGE;
  }

  return (
    <Button
      style={{
        flex: '1',
        backgroundColor: buttonColor,
        color: '#fff',
        transition: 'background-color 300ms',
      }}
      size="medium"
      aria-label="add"
      onClick={onClickCompleteButton}
    >
      {buttonText}
    </Button>
  );
};

CompleteTaskButton.propTypes = {
  $tasksItemsEntity: Proptypes.instanceOf(Map),
  $tasksItemsRefs: Proptypes.instanceOf(List),
  $task: Proptypes.instanceOf(Map),
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

CompleteTaskButton.defaultProps = {
  $tasksItemsRefs: new List(),
  $tasksItemsEntity: new Map(),
  $task: null,
};

const mapState = ({ $Task }) => ({
  $tasksItemsEntity: $Task.getIn(['currentTodoTask', 'items', 'entity']),
  $tasksItemsRefs: $Task.getIn(['currentTodoTask', 'items', 'refs']),
  $task: $Task.get('currentTodoTask'),
});

export default connect(
  mapState,
  null,
)(CompleteTaskButton);
