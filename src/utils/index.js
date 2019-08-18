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
