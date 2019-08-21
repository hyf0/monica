import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function Mask(props) {
  const { show, onClick } = props;

  return (
    <CSSTransition classNames="fade" in={show} timeout={300} mountOnEnter unmountOnExit>
      <div
        onClick={onClick}
        role="button"
        style={{
          // display: show ? 'block' : 'none',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100%',
          zIndex: '2000',
        }}
        className="transition-fade-self"
      />
    </CSSTransition>
  );
}

Mask.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

Mask.defaultProps = {
  onClick: () => {
    /*eslint-disable*/
    console.log('Mask:onClick');
  },
};

export default Mask;
