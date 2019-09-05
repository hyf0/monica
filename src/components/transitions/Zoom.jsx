// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import MaterialZoom from '@material-ui/core/Zoom';
// import { useIsMounted } from '../../hooks';
import transitionEnhancer from './transitionEnhancer';

// function Zoom(props) {
//   const { show: willShow, children, timeout } = props;

//   const [show, setShow] = useState(false);

//   const isMounted = useIsMounted();

//   useEffect(() => {
//     if (isMounted) setShow(willShow);
//   }, [isMounted, setShow, willShow]);

//   return (
//     <MaterialZoom timeout={timeout} in={show}>
//       {children}
//     </MaterialZoom>
//   );
// }

// Zoom.propTypes = {
//   children: PropTypes.node.isRequired,
//   show: PropTypes.bool.isRequired,
//   timeout: PropTypes.number,
// };


// Zoom.defaultProps = {
//   timeout: 300,
// };

export default transitionEnhancer(MaterialZoom);
