import Axios, { AxiosRequestConfig } from 'axios';
import { getLocalJWT } from './helper';

export const reqeust  = Axios.create({
    baseURL: 'http://127.0.0.1:3030',
});

reqeust.interceptors.request.use(
    config => {
        const jwt = getLocalJWT();
        if (jwt !== '') config.headers.Authorization = `Bearer ${jwt}`;
        return config;
    },
    (err: unknown) => Promise.reject(err),
);

// interface IGQLRequestConfig extends AxiosRequestConfig {
//     data: {
//         query: string;
//         variables?: {
//             [key: string]: unknown
//         }
//     }
// }

interface IGQLReqeust {
    query: string;
    variables?: {
        [key: string]: unknown
    }
}

export const reqGQL = (reqeustData: IGQLReqeust) => reqeust.post('/graphql', reqeustData);
