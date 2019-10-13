import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import {  useDispatch} from 'react-redux';
import { globalActions } from '../../store/action';
import { Color } from '../../util/constants';

export default function DefaultButton() {
  const dispatch = useDispatch();
  const showAsideMenu = useCallback(() => {
    dispatch(globalActions.createSetIsShowAsideMenu(true));
  }, [dispatch]);
  return (
    <Button style={{
      backgroundColor: Color.BLUE,
      color: '#fff',
    }} onClick={showAsideMenu} fullWidth variant="outlined">开始一个任务项</Button>
  );
}
