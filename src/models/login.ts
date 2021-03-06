import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { notification } from 'antd';

import { fakeAccountLogin, getFakeCaptcha, userLogout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log('response:', response);
      // Login successfully
      if (response && response.code === 1) {
        const token = 'bearer ' + response.data.access_token;
        sessionStorage.setItem('token', token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            const urlInfo = urlParams.origin + '/jiyi';
            redirect = redirect.substr(urlInfo.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        // notification.error({
        //   description: (response && response.msg )||'网络连接失败',
        //   message: (response && response.msg)||'网络连接失败'
        // });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { call, put }) {
      const { redirect } = getPageQuery();
      // redirect
      const response = yield call(userLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
