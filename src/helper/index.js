export const uniqueId = (function() {
    let nextId = 0;

    return function generatorOfUniqueId(prefix = '') {
        return prefix + String(nextId++);
    };
})();

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
