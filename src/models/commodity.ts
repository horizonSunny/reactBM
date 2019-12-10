import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList, product } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
    productWithId: {},
    // 查询商品列别的时候需要筛选的字段
    searchInfo: {
      pageNumber: 0,
      pageSize: 10,
      startTime: null,
      endTime: null,
      isShelf: null,
      productType: null,
      productName: null,
      approvalNumber: null,
    },
  },
  effects: {
    // 获取商品列表
    *getList({ payload }, { call, put }) {
      const response = yield call(productList, payload);
      yield put({
        type: 'list',
        payload: response.data,
      });
    },
    // 依据id获取单个商品列表
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
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CommodityModel;
