import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList } from '@/services/commodity';

const CommodityModel = {
  state: {},
  namespace: 'commodity',
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(productList, payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default CommodityModel;
