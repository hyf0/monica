import { TReduxThunk } from '../effects';
import { userActions } from '../action';
import { reqGQL } from '../../util/request';
import gql from 'gql-tag';
import { setLocalJWT } from '../../util/helper';

export function login(loginStatus?: { username: string; password: string }): TReduxThunk {
  return async (dispatch, getState) => {
    const {
      user: { isLogining },
    } = getState();
    if (isLogining) {
        console.error('正在登陆中，勿重复登录');
        return;
    }
    try {
      dispatch(userActions.createSetIsLoginning(true));
      console.log('login');
      const {
        data: { data },
      } = await reqGQL({
        variables: { ...(loginStatus ? { loginStatus } : {}) },
        query: gql`
          query($loginStatus: loginInput) {
            login(loginStatus: $loginStatus) {
              token {
                raw
              }
              user {
                id
                username
              }
            }
          }
        `,
      });
      console.log('resp', data);
      if (data == null) throw new Error('登录失败');
      setLocalJWT(data.login.token.raw);
      dispatch(userActions.createSetUser(data.login.user));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(userActions.createSetIsLoginning(false));
    }
  };
}
