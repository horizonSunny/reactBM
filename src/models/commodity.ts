import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList, product } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
    productWithId: {},
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(productList, payload);
      yield put({
        type: 'list',
        payload: response.data,
      });
    },
    *getProduct({ payload }, { call, put }) {
      const response = yield call(product, payload);
      yield put({
        type: 'product',
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
    // 获取单个商品
    product(state, action) {
      state.productWithId = action.payload;
      console.log('productWithId.action_', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CommodityModel;
