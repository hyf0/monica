// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import MaterialFade from '@material-ui/core/Fade';
// import { useIsMounted } from '../../hooks';
import transitionEnhancer from './transitionEnhancer';

// function Fade(props) {
//   const { show: willShow, children, timeout } = props;

//   const [show, setShow] = useState(false);

//   const isMounted = useIsMounted();

//   useEffect(() => {
//     if (isMounted) setShow(willShow);
//   }, [isMounted, setShow, willShow]);

//   return (
//     <MaterialFade timeout={timeout} in={show}>
//       {children}
//     </MaterialFade>
//   );
// }

// Fade.propTypes = {
//   children: PropTypes.node.isRequired,
//   show: PropTypes.bool.isRequired,
//   timeout: PropTypes.number,
// };

// Fade.defaultProps = {
//   timeout: 300,
// };


export default transitionEnhancer(MaterialFade);
