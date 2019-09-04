// import { isDev } from '../env';

export const uniqueId = (function saveNextId() {
  let count = -1;
  const timestamp = Date.now().toString();
  return function generatorOfUniqueId(prefix = '') {
    count += 1;
    const ramdomNumsStr = `${String(Math.round(Math.random() * 100000000))}-${String(Math.round(Math.random() * 100000000))}`;
    const id = `${ramdomNumsStr}-${timestamp}-${count}`;
    if (prefix.length === 0) return id;
    return `${prefix}-${id}`;
  };
}());

// export function deepCopy(obj) {
//   return JSON.parse(JSON.stringify(obj));
// }

export function withStopEventtPropagation(func) {
  return (evt, ...args) => {
    evt.stopPropagation();
    return func(...args);
  };
}

export function stopEventPropagation(evt) {
  evt.stopPropagation();
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

export function denormalize(obj, entityName = 'entity', refsName = 'refs') {
  const result = obj[refsName].map((ref) => obj[entityName][ref]);
  return result;
}

export function getLocalJWT() {
  return localStorage.getItem('__jwt') || '';
}

export function setLocalJWT(jwt) {
  localStorage.setItem('__jwt', jwt);
}
// window.getLocalJWT = getLocalJWT;
// window.setLocalJWT = setLocalJWT;
