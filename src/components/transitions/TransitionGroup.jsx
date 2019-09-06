import React, {
  useState, useEffect, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';

// let lastChildsRef.current = null;
// const keysOfChildGoingToBeRemovedRef.current = new Set();

function TransitionGroup(props) {
  const lastChildsRef = useRef(null);
  const keysOfChildGoingToBeRemovedRef = useRef(new Set());
  // init
  const { children } = props;
  const childs = React.Children.map(children, (c) => React.cloneElement(c, {
    show: true,
  }));
  const [childsToBeShown, setChildsToBeShown] = useState(childs);

  const isChildsChanged = useMemo(() => {
    if (lastChildsRef.current == null) return false;
    if (lastChildsRef.current.length !== childs.length) return true;
    const isChildsNotChanged = childs.every(
      (newChild, index) =>
        (
          keysOfChildGoingToBeRemovedRef.current.has(newChild.key)
          || newChild.key === lastChildsRef.current[index].key
        ),
    );
    return !isChildsNotChanged;
  }, [childs]);

  // console.log('isChildsChanged', isChildsChanged);

  useEffect(() => {
    if (lastChildsRef.current == null) lastChildsRef.current = childs;
    // 仅仅应当在childs改变时触发
    if (isChildsChanged) {
      // 确定被移除的子组件
      const childsGoingToBeRemoved = lastChildsRef.current.filter(
        (c) =>
          !keysOfChildGoingToBeRemovedRef.current.has(c.key)
          && childs.find((newChild) => newChild.key === c.key) == null,
      );
      // 确定新增加的子组件
      const newChilds = childs.filter(
        (c) =>
          !keysOfChildGoingToBeRemovedRef.current.has(c.key)
          && lastChildsRef.current.find((oldChild) => oldChild.key === c.key) == null,
      );
      // 得到即将被展示组件的一份拷贝
      const newChildsToBeShown = childsToBeShown.slice().concat(newChilds);
      // 设置消失动画
      childsGoingToBeRemoved.forEach((childGoingToBeRemoved) => {
        // 将已经设置好的存储在set里，防止重复设置已经设置过的元素
        keysOfChildGoingToBeRemovedRef.current.add(childGoingToBeRemoved.key);
        const targetIndex = newChildsToBeShown.findIndex(
          (nc) => nc.key === childGoingToBeRemoved.key,
        );
        // 使用ref回调来确保一定得到实例对象，从而得到实例上的timeout时间
        const updatedChildElment = React.cloneElement(childGoingToBeRemoved, {
          show: false,
          ref: function makeSureDeleteSelf(ref) {
            // 注意当组件umount时或者ref属性本身发生变化时，回调会被再次执行，但是此时ref参数为null
            const isMounted = ref != null;
            if (!isMounted) return;
            if (ref.timeout == null) {
              throw new Error(
                '被包裹的Transtion组件没有提供timeout属性，TransitionGroup组件需要这个属性来判断何时删除对应的组件',
              );
            }
            setTimeout(() => {
              keysOfChildGoingToBeRemovedRef.current.delete(updatedChildElment.key);
              setChildsToBeShown((prevChilds) =>
                prevChilds.filter((pc) => pc.key !== updatedChildElment.key));
            }, ref.timeout);
          },
        });

        newChildsToBeShown[targetIndex] = updatedChildElment;
      });
      setChildsToBeShown(newChildsToBeShown);
      lastChildsRef.current = childs;
    }
  }, [childs, childsToBeShown, isChildsChanged]);

  return <>{childsToBeShown}</>;
}

TransitionGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransitionGroup;
