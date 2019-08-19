export const uniqueId = (function saveNextId() {
  let curID = -1;
  const date = Date.now().toString();
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
