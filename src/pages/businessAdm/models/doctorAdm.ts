import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  insertBusiness,
  saveBusiness,
  switchStatus,
  queryOperation,
  //2.0
  getDoctorPage,
} from '@/services/businessAdm';
const doctorAdm = {
  namespace: 'doctorAdm',

  state: {
    businessData: [],
    queryForm: {
      authStatus: '0',
      doctorName: '',
      hospitalName: '',
      status: '0',
    },
    pagination: {
      pageNumber: 0,
      pageSize: 10,
    },
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const response = yield call(getDoctorPage, payload);
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
  },

  reducers: {
    queryData(state, action) {
      let pagination = {
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        total: action.payload.totalElements,
      };
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
      let temppagination = {
        ...state.pagination,
        ...action.payload,
      };
      return {
        ...state,
        pagination: temppagination,
      };
    },
  },
};

export default doctorAdm;
