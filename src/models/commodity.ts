import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList, product } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
    productWithId: {},
    // 查询商品列别的时候需要筛选的字段,只是searchInfo表单里面含有的字段
    // searchInfo: {},
  },
  effects: {
    // 获取商品列表
    *getList({ payload }, { call, put }) {
      console.log('in_getList');
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
    // 将搜索表单的数据放在store,分页时候要用到
    // resetSearch(state, action) {
    //   state.searchInfo = action.payload;
    //   console.log('state.searchInfo_', state.searchInfo);
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
  },
};

export default CommodityModel;
