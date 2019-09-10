import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from 'react-dump-transition';

function Drawer(props) {
  const { show, children } = props;

  return (
    <Slide show={show} direction="right">
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
    </Slide>
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
