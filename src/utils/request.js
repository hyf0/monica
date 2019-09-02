import Axios from 'axios';
import { getRemoteHostUrl } from '../config';
import { getLocalJWT } from '.';

export const request = Axios.create({
  baseURL: getRemoteHostUrl(),
  timeout: 1000,
});

request.interceptors.request.use(
  config => {
    const jwt = getLocalJWT();
    if (jwt === '' || jwt == null) return config;
    const changedConfig = config;
    changedConfig.headers.Authorization = `Bearer ${jwt}`;
    return changedConfig;
  },
  err => Promise.reject(err),
);
