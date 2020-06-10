import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getWzOrderPage, getWzOrderDetails } from '@/services/orderMagt';
const inquiry = {
  namespace: 'inquiry',

  state: {
    queryForm: {
      endTime: '',
      startTime: '',
      doctorName: '',
      medicineName: '',
      type: 0,
      orderNo: '',
    },
    pagination: {
      pageNumber: 0,
      pageSize: 10,
    },
    currentOrder: {},
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const response = yield call(getWzOrderPage, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'queryData',
          payload: response.data,
        });
      }
      return response;
    },
    *queryFormChange({ payload }, { call, put }) {
      yield put({
        type: 'formChange',
        payload: payload,
      });
      return payload;
    },
    *querypaginationChange({ payload }, { call, put }) {
      yield put({
        type: 'paginationChange',
        payload: payload,
      });
      return payload;
    },
    // 获取问诊单详情
    *getWzOrderDetails({ payload }, { call, put }) {
      const response = yield call(getWzOrderDetails, payload);
      yield put({
        type: 'saveCurrentOrder',
        payload: response.data,
      });
      return;
    },
  },

  reducers: {
    queryData(state, action) {
      let pagination = {
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        total: action.payload.totalElements,
        current: action.payload.pageNumber + 1,
      };
      // debugger;
      return {
        ...state,
        businessData: action.payload.pageList || [],
        pagination: pagination,
      };
    },
    formChange(state, action) {
      return {
        ...state,
        queryForm: action.payload,
      };
    },
    paginationChange(state, action) {
      return {
        ...state,
        pagination: action.payload,
      };
    },
    saveCurrentOrder(state, action) {
      return {
        ...state,
        currentOrder: action.payload,
      };
    },
  },
};

export default inquiry;
