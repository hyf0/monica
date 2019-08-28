import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Store } from 'redux';
import { is } from 'immutable';

/**
 *
 * @param {Store} store
 */
export function createUseStore(store) {
  return function useStore(
    stateFilter = (state) => state,
    // mapDispatchToProps = null,
  ) {
    const [filtedState, setFiltedState] = useState(
      stateFilter(store.getState()),
    );
    useEffect(() => {
      const unsub = store.subscribe(() => {
        const changedState = stateFilter(store.getState());
        setFiltedState((prevState) => {
          // setState的值与先前state的值不一样时，react才会触发充渲染，注意react的前后state的比较仅仅是引用比较
          // 因此这里实现的比较，可以根据的自己的需求，可以任何时候直接返回新state，或者浅比较再选择性返回，由于我
          // 整个state tree都是immutable的，所以直接使用immutable提供的比较is函数，当状态没变时，返回先前的state的
          // 由于引用相等，不会重渲染，而当改变时，返回新的state，引用改变，触发重渲染，结合immutable的特性和容器型组件的特点，有以下几个好处
          // - 容器型组件仅仅从redux接受状态，在使用useStore的情况下，相当于隐式实现了memo功能
          // - 结合整个state tree 都是 immutable 的特点，这里is比较函数，是相当高效率的，远高于浅比较。
          if (!is(prevState, changedState)) {
            return changedState;
          }
          return prevState;
        });
      });
      return () => {
        unsub();
      };
    }, [setFiltedState, stateFilter]);

    return {
      ...filtedState,
      dispatch: store.dispatch, // 语法糖，方便使用dispatch，不用单独写个useDispatch方法了
    };
  };
}

export const foo = 'foo';
