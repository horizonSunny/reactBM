import { Effect } from 'dva';
import { Reducer } from 'redux';

import { productList, product, editorProduct, newProduct } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodity',
  state: {
    productList: {},
    productWithId: {},
    productLog: {},
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
    // 新建产品
    *newProduct({ payload }, { call, put }) {
      const response = yield call(newProduct, payload);
      yield put({
        type: 'successProduct',
        payload: response.data,
      });
    },
    // 编辑产品
    *editProduct({ payload }, { call, put }) {
      console.log('in_editProduct');
      const response = yield call(editorProduct, payload);
      yield put({
        type: 'successProduct',
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
      state.productWithId = action.payload.product;
      state.productLog = action.payload.log;
      console.log('in product');
      return {
        ...state,
        ...action.payload,
      };
    },
    // 重置所有图片信息
    resetProduct(state, action) {
      state.productWithId = action.payload;
      return {
        ...state,
        ...action.payload,
      };
    },
    // 编辑或者新建产品成功后
    successProduct(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CommodityModel;
