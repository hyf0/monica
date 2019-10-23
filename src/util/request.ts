import Axios from 'axios';
import { getLocalJWT } from './helper';
import { IS_DEV } from './constants';

const baseURL = IS_DEV ? 'http://127.0.0.1:3030' : 'http://101.37.174.138:3030';

export const reqeust  = Axios.create({
    baseURL,
});

reqeust.interceptors.request.use(
    config => {
        const jwt = getLocalJWT();
        if (jwt !== '') config.headers.Authorization = `Bearer ${jwt}`;
        return config;
    },
    (err: unknown) => Promise.reject(err),
);

interface IGQLReqeust {
    query: string;
    variables?: {
        [key: string]: unknown
    }
}

export const reqGQL = (reqeustData: IGQLReqeust) => reqeust.post('/graphql', reqeustData);
