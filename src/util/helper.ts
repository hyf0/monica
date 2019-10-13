
export function getLocalJWT() {
  return localStorage.getItem('__jwt') || '';
}

export function setLocalJWT(jwt: string) {
  localStorage.setItem('__jwt', jwt);
}
