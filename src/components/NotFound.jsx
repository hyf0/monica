/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function NotFound(props) {
  const { message, time } = props;
  const [isTimeout, setIsTimeout] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
    }, time);

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [time, setIsTimeout, setSeconds]);

  return isTimeout ? (
    <Redirect to="/" />
  ) : (
    <div
      style={{
        padding: '20px',
      }}
    >
      <h1>{message}</h1>
      <h2>
        {Math.round(time / 1000) - seconds}
        秒后回到主页
      </h2>
    </div>
  );
}

NotFound.propTypes = {
  message: PropTypes.string,
  time: PropTypes.number,
};

NotFound.defaultProps = {
  message: '404 Not Found',
  time: 3000,
};
export default NotFound;
