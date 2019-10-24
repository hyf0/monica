import { TReduxThunk, globalEffects } from '../effects';
import { userActions } from '../action';
import { reqGQL } from '../../util/request';
import gql from 'gql-tag';
import { setLocalJWT } from '../../util/helper';
import { NotificationType } from '../../util/constants';

export function login(loginStatus?: {
  username: string;
  password: string;
}): TReduxThunk {
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
      // console.log('login');
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
      // console.log('resp', data);
      if (data == null) throw new Error('登录失败');
      setLocalJWT(data.login.token.raw);
      dispatch(userActions.createSetUser(data.login.user));
      dispatch(
        globalEffects.pushNotification({
          title: '登录成功',
          type: NotificationType.SUCCESS,
        }),
      );
    } catch (err) {
      dispatch(
        globalEffects.pushNotification({
          title: '登录失败',
          type: NotificationType.ERROR,
        }),
      );
      setLocalJWT('');
      console.error(err);
    } finally {
      dispatch(userActions.createSetIsLoginning(false));
    }
  };
}

export function logout(): TReduxThunk {
  return async dispatch => {
    setLocalJWT('');
    dispatch(userActions.createLogout());
  };
}

export function register(username: string, password: string): TReduxThunk {
  return async (dispatch, getState) => {
    try {
      const {
        data: { data },
      } = await reqGQL({
        variables: { username, password },
        query: gql`
          mutation($username: String!, $password: String!) {
            register(username: $username, password: $password) {
              token {
                raw
              }
            }
          }
        `,
      });
      // console.log('resp', data);
      if (data == null) throw new Error('注册失败');
      setLocalJWT(data.register.token.raw);
      dispatch(login());
      dispatch(
        globalEffects.pushNotification({
          title: '注册成功',
          type: NotificationType.SUCCESS,
        }),
      );
    } catch (err) {
      dispatch(
        globalEffects.pushNotification({
          title: '注册失败',
          type: NotificationType.ERROR,
        }),
      );
      console.error(err);
    } finally {
    }
  };
}
