import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function Drawer(props) {
  const { show, children } = props;

  return (
    <CSSTransition
      classNames="ani-slide-right"
      timeout={300}
      in={show}
      appear
      mountOnEnter
      unmountOnExit
    >
      <div
        style={{
          position: 'absolute',
          width: '65%',
          maxWidth: '375px',
          height: '100vh',
          backgroundColor: '#fff',
          overflowY: 'scroll', //* 防止子margin-top影响父margin-top *
          overflowX: 'hidden',
          opacity: '1',
          zIndex: '3000',
        }}
        className="transition-slide-right-self"
      >
        {children}
      </div>
    </CSSTransition>
  );
}

Drawer.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

Drawer.defaultProps = {
  show: true,
  children: '',
};

export default Drawer;
