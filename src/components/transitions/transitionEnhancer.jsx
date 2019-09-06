import React from 'react';
import PropTypes from 'prop-types';

function transitionEnhancer(TransitionComponent) {
  class EnhancedTransitionComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
      const { timeout = null } = this.props;
      if (timeout == null) throw new Error('你必须提供一个带有属性timeout的组件来enhance');
      this.timeout = timeout;
    }

    componentDidMount() {
      const { show: willShow } = this.props;
      // console.log('已经挂载组件，准备展示', this.state, 'willShow', willShow);
      this.setState({
        show: willShow,
      });
    }

    componentWillReceiveProps(nextProps) {
      const { show: willShow } = nextProps;
      // console.log('update组件，准备展示', this.state, 'willShow', willShow);
      this.setState({
        show: willShow,
      });
    }

    render() {
      // show是个常用名字，且是本组件的保留属性，防止错误传递到TransitionComponent上，造成冲突
      const {
        show: willShow, children, timeout, ...rest
      } = this.props;

      const { show } = this.state;

      // console.log('render', this.state);
      // console.warn('Children 必须能够接受style属性');

      return (
        <TransitionComponent
          {...rest}
          timeout={timeout}
          in={show}
        >
          {React.Children.only(children)}
        </TransitionComponent>
      );
    }
  }

  EnhancedTransitionComponent.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool,
    timeout: PropTypes.number,
  };

  EnhancedTransitionComponent.defaultProps = {
    timeout: 300,
    show: false,
  };

  return EnhancedTransitionComponent;
}

export default transitionEnhancer;
