export const uniqueId = (function saveNextId() {
  let nextId = -1;
  const date = 'develoopment' || new Date().toISOString();
  return function generatorOfUniqueId(prefix = '') {
    nextId += 1;
    if (prefix.length === 0) return `${date} - ${nextId}`;
    return `${prefix} - ${date} - ${nextId}`;
  };
}());

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
