import { isDev } from '../env';

export const uniqueId = (function saveNextId() {
  let curID = -1;
  let date = Date.now().toString();
  if (isDev()) {
    console.log('处于开发模式中');
    date = 1566347293201; // 固定时间，防止每次刷新改变时间，导致程序无法根据id找到对应任务
  }
  return function generatorOfUniqueId(prefix = '') {
    curID += 1;
    if (prefix.length === 0) return `${date}-${curID}`;
    return `${prefix}-${date}-${curID}`;
  };
}());

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function withStopEventtPropagation(func) {
  return (evt, ...args) => {
    evt.stopPropagation();
    return func(...args);
  };
}

/**
 *
 * @param {Array} arr
 * @param {String} name
 * @param {String} key
 */
export function normalize(arr, name = 'entity', key = 'id') {
  const result = {};
  const entity = {};
  const refs = [];
  const refsName = 'refs';
  result[name] = entity;
  result[refsName] = refs;
  arr.forEach((oriObj) => {
    const identityKey = oriObj[key];
    refs.push(identityKey);
    entity[identityKey] = oriObj;
  });
  return result;
}
