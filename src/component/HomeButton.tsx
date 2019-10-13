/* eslint-disable no-lone-blocks */
import React, { useCallback, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Proptypes from 'prop-types';


import HomeIcon from '@material-ui/icons/Home';
import { useForceUpdate } from '../util/hooks';


function HomeButton({onClick, needDoubleClick, timeout}: {
    onClick: (...args: any[]) => void;
    needDoubleClick: boolean,
    timeout: number,
}) {

  const forceUpdate = useForceUpdate();
  const clickCountRef = useRef(0);
  const timerIdRef = useRef<null | number>(null);

  const doOnClick = useCallback((...args: any[]) => {
    if (!needDoubleClick) {
      onClick(...args);
      return;
    }

    // 以下是开启了needDoubleClick模式的逻辑
    clickCountRef.current += 1;
    const clickCountSoFar = clickCountRef.current;
    if (clickCountSoFar === 1) {
      if (timerIdRef.current != null) clearTimeout(timerIdRef.current); // 防御性判断

      timerIdRef.current = setTimeout(() => {
        clickCountRef.current = 0;
        timerIdRef.current = null;
        forceUpdate();
      }, timeout);
    } else if (clickCountSoFar === 2) {
      if (timerIdRef.current != null) clearTimeout(timerIdRef.current);

      clickCountRef.current = 0;
      onClick(...args);
    }
    forceUpdate();
  }, [onClick, needDoubleClick, forceUpdate, timeout]);

  const backgroundColor = clickCountRef.current === 1
    ? 'rgba(0, 0, 0, 0.25)'
    : '';

  return (
    <IconButton
      style={{
        backgroundColor,
        transition: 'background-color 300ms linear',
      }}
      onClick={doOnClick}
      edge="end"
    >
      <HomeIcon />
    </IconButton>
  );
}

HomeButton.propTypes = {
  onClick: Proptypes.func.isRequired,
  needDoubleClick: Proptypes.bool,
  timeout: Proptypes.number,
};

HomeButton.defaultProps = {
  needDoubleClick: false,
  timeout: 1000,
};

export default HomeButton;
