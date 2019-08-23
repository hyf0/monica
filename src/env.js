/**
 * @param {String} host
 */
const createIsDev = host => () => {
  const hosts = ['localhost', '127.0.0.1'];
  return hosts.some(hs => host.includes(hs));
};

// eslint-disable-next-line no-restricted-globals
export const isDev = createIsDev(location.host);
// export const isDev = () => false;
export const foo = 'nothing';
