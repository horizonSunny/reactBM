import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getCategoryList, reverseCategoryList, deleteCategoryItem } from '@/services/operTool';
const CommodityModel = {
  namespace: 'operTool',
  state: {
    categoryList: [],
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *getCategoryList({ payload }, { call, put }) {
      const response = yield call(getCategoryList, payload);
      console.log('in_getCategoryList_', response);
      yield put({
        type: 'setCategoryList',
        payload: response.data.pageList,
      });
    },
    // 改变list顺序
    *reverseCategoryList({ payload }, { call, put }) {
      const response = yield call(reverseCategoryList, payload);
      console.log('in_reverseCategoryList_', response);
      yield put({
        type: 'reverseCategory',
        payload: payload.quickCategoryIds,
      });
    },
    // 删除listItem
    *deleteCategoryItem({ payload }, { call, put }) {
      const response = yield call(deleteCategoryItem, payload);
      console.log('in_reverseCategoryList_', response);
      yield put({
        type: 'deleteCategory',
        payload: payload.quickCategoryId,
      });
    },
  },

  reducers: {
    // 设置categoryList
    setCategoryList(state, action) {
      console.log('action.categoryList_', action);
      return {
        ...state,
        categoryList: action.payload,
      };
    },
    // 排序categoryList
    reverseCategory(state, action) {
      const startIndex = state.categoryList.findIndex(item => {
        return item.quickCategoryId === action.payload[0];
      });
      const endIndex = state.categoryList.findIndex(item => {
        return item.quickCategoryId === action.payload[1];
      });
      const item = state.categoryList[startIndex];
      state.categoryList[startIndex] = state.categoryList[endIndex];
      state.categoryList[endIndex] = item;
      return {
        ...state,
      };
    },
    // 删除id
    deleteCategory(state, action) {
      const newArr = state.categoryList.filter(item => {
        return item.quickCategoryId !== action.payload;
      });
      return {
        ...state,
        categoryList: newArr,
      };
    },
  },
};

export default CommodityModel;
