/* eslint-disable import/prefer-default-export */
import { isDev } from './env';

export function getRemoteHostUrl() {
  if (isDev()) return 'http://localhost:3031/';
  return 'http://101.37.174.138/';
}
