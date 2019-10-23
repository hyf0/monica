
export function getLocalJWT() {
  return localStorage.getItem('__jwt') || '';
}

export function setLocalJWT(jwt: string) {
  localStorage.setItem('__jwt', jwt);
}

export function getIsDevelopment() {
  const devlopmentPaths = ['localhost', '127.0.0.1', '192.168.43.72'];
  return devlopmentPaths.some(p => window.location.origin.includes(p));
}


export function createDebounced<FN_ARG>(fn: (...args: FN_ARG[]) => unknown, timeout = 1000) {
  let timerId: number | null= null;
  return (...args: FN_ARG[]) => {
    if (timerId != null) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      timerId = null;
      fn(...args);
    }, timeout);
  };
}

export function removeArr<T>(arr: T[], searcher: (value: T, index: number) => boolean) {
  const targetIndex = arr.findIndex(searcher);
  if (targetIndex >= 0) {
    arr.splice(targetIndex, 1);
  }
}
