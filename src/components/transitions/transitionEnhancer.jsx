import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIsMounted } from '../../hooks';

function transitionEnhancer(TransitionComponent) {
  function EnhancedTransitionComponent(props) {
    const {
      show: willShow, children, timeout, ...rest
    } = props;

    const [show, setShow] = useState(false);

    const isMounted = useIsMounted();

    useEffect(() => {
      if (isMounted) setShow(willShow);
    }, [isMounted, setShow, willShow]);

    return (
      <TransitionComponent {...rest} timeout={timeout} in={show}>
        {children}
      </TransitionComponent>
    );
  }
  EnhancedTransitionComponent.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    timeout: PropTypes.number,
  };

  EnhancedTransitionComponent.defaultProps = {
    timeout: 300,
  };
  return EnhancedTransitionComponent;
}

export default transitionEnhancer;
