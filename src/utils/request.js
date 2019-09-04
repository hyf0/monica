import Axios from 'axios';
import { getRemoteHostUrl } from '../config';
import { getLocalJWT, uniqueId } from '.';

export const request = Axios.create({
  baseURL: getRemoteHostUrl(),
  timeout: 1000,
});

export const foo = ';';

request.interceptors.request.use(
  (config) => {
    const jwt = getLocalJWT();
    if (jwt === '' || jwt == null) return config;
    const changedConfig = config;
    changedConfig.headers.Authorization = `Bearer ${jwt}`;
    return changedConfig;
  },
  (err) => Promise.reject(err),
);

request.interceptors.response.use(
  (config) => config,
  (err) => {
    const { data: errorResp } = err.response;
    errorResp.type = 'error';
    errorResp.key = uniqueId('error');
    return Promise.reject(errorResp);
  },
);
