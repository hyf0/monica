import React, {
  useState, useEffect, useMemo, useRef,
} from 'react';
import { EnhancedTransitionComponentBase } from './transitionEnhancer';

// let lastChildsRef.current = null;
// const keysOfChildGoingToBeRemovedRef.current = new Set();

function TransitionGroup(props) {
  const lastChildKeysRef = useRef(null);
  const keysOfChildGoingToBeRemovedRef = useRef(new Set());
  const childsMapRef = useRef(new Map());
  // init
  const { children } = props;
  const childKeys = []; // currentChildKeys
  React.Children.forEach(children, child => {
    const { key = null } = child;
    if (key == null) throw new Error('组件必须要有一个key属性');
    childKeys.push(key);
    childsMapRef.current.set(key, React.cloneElement(child, { show: true }));
  });
  const [childKeysToBeShown, setChildKeysToBeShown] = useState(childKeys);

  const isChildKeysChanged = useMemo(() => {
    const lastChildKeys = lastChildKeysRef.current;
    if (lastChildKeys == null) return false;
    if (lastChildKeys.length !== childKeys.length) return true;

    const isChildsNotChanged = childKeys.every(
      (currentChildKey, index) => currentChildKey === lastChildKeys[index],
    );
    return !isChildsNotChanged;
  }, [childKeys]);

  useEffect(() => {
    if (lastChildKeysRef.current == null) lastChildKeysRef.current = childKeys;
    // 仅仅应当在childs改变时触发
    if (isChildKeysChanged) {
      const keysOfChildGoingToBeRemoved = keysOfChildGoingToBeRemovedRef.current;
      const lastChildKeys = lastChildKeysRef.current;
      // 确定被移除的子组件
      const childKeysGoingToBeRemoved = lastChildKeys.filter(
        (lastChildKey) =>
          (
            !keysOfChildGoingToBeRemoved.has(lastChildKey)
            && !childKeys.includes(lastChildKey)
          ),
      );
      const newChildKeysToBeShown = childKeysToBeShown.slice();
      childKeys.forEach((currentChildKey, index) => {
        // 将新增加的子组件放到展示数组对应的位置上
        const isNewChildKey = (
          !keysOfChildGoingToBeRemoved.has(currentChildKey) // 不是已经被移除的
          && !lastChildKeys.includes(currentChildKey) // 在上一次的childKeys里找不到
        );
        if (!isNewChildKey) return;
        newChildKeysToBeShown.splice(index, 0, currentChildKey);
      });
      // 得到即将被展示组件的一份拷贝
      // 设置消失动画
      childKeysGoingToBeRemoved.forEach((childKeyGoingToBeRemoved) => {
        // 将已经设置好的存储在set里，防止重复设置已经设置过的元素
        keysOfChildGoingToBeRemoved.add(childKeyGoingToBeRemoved);
        // 使用ref回调来确保一定得到实例对象，从而得到实例上的timeout时间
        const childsMap = childsMapRef.current;
        const oringinalElement = childsMap.get(childKeyGoingToBeRemoved);
        const updatedChildElment = React.cloneElement(oringinalElement, {
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
              keysOfChildGoingToBeRemoved.delete(updatedChildElment.key); // 删除掉自己
              childsMap.delete(updatedChildElment.key); // 防止内存泄漏
              setChildKeysToBeShown(prevChildKeys =>
                prevChildKeys.filter((pck) => pck !== updatedChildElment.key));
            }, ref.timeout);
          },
        });
        childsMap.set(childKeyGoingToBeRemoved, updatedChildElment);
      });
      setChildKeysToBeShown(newChildKeysToBeShown);
      lastChildKeysRef.current = childKeys; // 本次的key在渲染后就变成上次的key了
    }
  }, [childKeys, childKeysToBeShown, isChildKeysChanged]);

  return <>{childKeysToBeShown.map(key => childsMapRef.current.get(key))}</>;
}

TransitionGroup.propTypes = {
  children: function checkIfIs(props, propName, componentName) {
    const children = props[propName];
    React.Children.forEach(children, child => {
      const parentClass = Object.getPrototypeOf(child.type);
      // console.log('parentClass', parentClass, parentClass === EnhancedTransitionComponentBase);
      if (parentClass !== EnhancedTransitionComponentBase) {
        throw Error(`${componentName}的子元素必须是经过transitionEnhancer的自定义动画组件，或是自带的动画组件， 却得到了${child.constructor}`);
      }
    });
  },
};

TransitionGroup.defaultProps = {
  children: null,
};

export default TransitionGroup;
