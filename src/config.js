import { isDev } from "./env";

export function getRemoteHostUrl() {
  if (isDev()) return 'http://localhost:3031/';
  return '';
}
