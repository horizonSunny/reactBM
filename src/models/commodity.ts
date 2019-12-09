import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(productList, payload);
      yield put({
        type: 'list',
        payload: response.data,
      });
    },
  },

  reducers: {
    // 获取商品列表
    list(state, action) {
      action.payload.pageList.forEach((element, index) => {
        element.key = index;
      });
      state.productList = action.payload;
      console.log('list.action_', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CommodityModel;
