import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  //2.0
  getHospitalPage,
  getHospitalDetails,
} from '@/services/businessAdm';
const hospitalAdm = {
  namespace: 'hospitalAdm',

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
    currentHospital: {},
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const response = yield call(getHospitalPage, payload);
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
    *getHospitalDetails({ payload }, { call, put }) {
      const response = yield call(getHospitalDetails, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'saveHospitalDetails',
          payload: response.data,
        });
      }
      return response;
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
    saveHospitalDetails(state, action) {
      return {
        ...state,
        currentHospital: action.payload,
      };
    },
  },
};

export default hospitalAdm;
