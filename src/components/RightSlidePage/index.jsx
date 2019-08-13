import React, { useCallback } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { fade, slideRight } from './style';

function RightSlidePage(props) {
  const { show, children, onClickMask } = props;

  const stopEvtPropagation = useCallback((evt) => {
    evt.stopPropagation();
    // evt.persist();
  }, []);

  return (
    <CSSTransition classNames="fade" in={show} timeout={300} appear>
      <div
        onClick={onClickMask}
        role="button"
        className={[
          css`
            position: absolute;
            background-color: rgba(0, 0, 0, 0.3);
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 2000;
          `,
          fade,
        ].join(' ')}
      >
        <CSSTransition classNames="slide-right" timeout={300} in={show} appear>
          <div
            onClick={stopEvtPropagation}
            className={[
              css`
                width: 65%;
                max-width: 375px;
                height: 100%;
                background-color: #fff;
                overflow-y: scroll; /* 防止子margin-top影响父margin-top */
                overflow-x: hidden;
              `,
              slideRight,
            ].join(' ')}
          >
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

RightSlidePage.propTypes = {
  onClickMask: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
};

RightSlidePage.defaultProps = {
  show: true,
  onClickMask: () => {
    /*eslint-disable*/
    console.log('onClickMask');
  },
  children: <div>default menu content</div>,
};

export default RightSlidePage;
