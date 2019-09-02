// import Observable from 'rxjs/internal/Observable';
import { Observable } from 'rxjs';
import Axios from 'axios';
import { getRemoteHostUrl } from '../config';

const remoteHost = getRemoteHostUrl();

/**
 *
 * @param {string} url
 * @param {'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'} method
 */
export const requestTo = (url, method, data = null) => {
  const { CancelToken } = Axios;
  let cancelReqeust;
  let isRequestEnd = false;
  return new Observable((observer) => {
    Axios.request({
      url,
      data,
      method,
      baseURL: remoteHost,
      cancelToken: new CancelToken((ctoken) => {
        cancelReqeust = ctoken;
      }),
    })
      .then((axiosResp) => {
        isRequestEnd = true;
        observer.next(axiosResp);
        observer.complete();
      })
      .catch((err) => {
        if (cancelReqeust != null) cancelReqeust();
        // observer.error(err);
      });
  });
};

export const foo = 'foo';
