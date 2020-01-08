import { Effect } from 'dva';
import { Reducer } from 'redux';

// 以下是mock数据
import classifyInfo from '../../mock/commdityClassify';
import { filterClassify } from '@/utils/filterProperty';
// import {
//   productList,
//   product,
//   editorProduct,
//   newProduct,
//   productype,
//   shelve,
// } from '@/services/commodity';

const CommodityModel = {
  namespace: 'commodityClassify',
  state: {
    classifyInfo,
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *classification({ payload, callback }, { call, put }) {
      // const response = yield call(productList, payload);
      // const response = this.state.classifyInfo;
      // console.log('this.state.classifyInfo_', this.state.classifyInfo);
      yield put({
        type: 'sortCas',
      });
      // if (response.code === 1) {
      //   //接口调用成功
      //   // do something...
      //   return response.data; //  通过return给dispatch返回回调结果！
      // } else {
      //   //接口调用失败
      //   // do something...
      //   return false;
      // }
    },
    // // 依据id获取单个商品列表
    // *getProduct({ payload }, { call, put }) {
    //   const response = yield call(product, payload);
    //   yield put({
    //     type: 'product',
    //     payload: response.data,
    //   });
    // },
    // // 新建产品
    // *newProduct({ payload }, { call, put }) {
    //   const response = yield call(newProduct, payload);
    //   yield put({
    //     type: 'successProduct',
    //     payload: response.data,
    //   });
    // },
    // // 编辑产品
    // *editProduct({ payload }, { call, put }) {
    //   console.log('in_editProduct');
    //   const response = yield call(editorProduct, payload);
    //   yield put({
    //     type: 'successProduct',
    //     payload: response.data,
    //   });
    // },
    // // 获取产品类型字典
    // *getProductType(_, { call, put }) {
    //   const response = yield call(productype);
    //   yield put({
    //     type: 'allProductType',
    //     payload: response.data,
    //   });
    // },
    // // 上下架产品
    // *shelveProduct({ payload }, { call, put }) {
    //   console.log('in_shelveProduct');
    //   const response = yield call(shelve, payload);
    //   if (response.code === 1) {
    //     //接口调用成功
    //     // do something...
    //     return true; //  通过return给dispatch返回回调结果！
    //   } else {
    //     //接口调用失败
    //     // do something...
    //     return false;
    //   }
    // },
  },

  reducers: {
    // 对传过来的值递归进行一,二,三级的分类
    sortCas(state, action) {
      const commdityClassify = filterClassify(state.classifyInfo.data);
      return {
        ...state,
        ...commdityClassify,
      };
    },
  },
};

export default CommodityModel;
