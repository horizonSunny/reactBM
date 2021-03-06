import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  queryBusiness,
  insertBusiness,
  saveBusiness,
  switchStatus,
  queryChannel,
  queryOperation,
} from '@/services/businessAdm';
const businessAdm = {
  namespace: 'businessAdm',

  state: {
    businessData: [],
    queryForm: {
      adminName: '',
      endTime: '',
      startTime: '',
      status: '',
      channel: '',
      tenantName: '',
      province: [],
    },
    pagination: {
      pageNumber: 0,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return `共 ${total} 条`;
      },
    },
    currentRecord: {},
    channel: [],
    operaRecord: [],
    recordpagination: {
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
    },
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      if (payload.province && payload.province.length > 0) {
        payload.province = payload.province.join(',');
      }
      const response = yield call(queryBusiness, payload);
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
    *currentRecord({ payload }, { call, put }) {
      yield put({
        type: 'record',
        payload: payload,
      });
      return payload;
    },
    *saveBusiness({ payload }, { call, put, select }) {
      const data = yield select(state => state.businessAdm.currentRecord);
      let response = {};
      let tempenterpriseQualification = [];
      if (payload.enterpriseQualification.length > 0) {
        payload.enterpriseQualification.forEach(item => {
          if (!item.url) {
            item.url = item.response.data;
          }
          tempenterpriseQualification.push({
            name: item.name,
            url: item.url,
          });
        });
        payload.enterpriseQualification = tempenterpriseQualification;
      }
      let tempstoreLive = [];
      if (payload.storeLive.length > 0) {
        payload.storeLive.forEach(item => {
          if (!item.url) {
            item.url = item.response.data;
          }
          tempstoreLive.push(item.url);
        });
        payload.storeLive = tempstoreLive;
      }
      let tempParam = Object.assign({}, data, payload);
      if (data && data.tenantId) {
        // 更新
        response = yield call(saveBusiness, tempParam);
      } else {
        // 新增
        response = yield call(insertBusiness, tempParam);
      }

      if (response && response.code === 1) {
        yield put({
          type: 'saveData',
          payload: response.data,
        });
      }
      return response;
    },
    *switchStatus({ payload }, { call, put }) {
      const response = yield call(switchStatus, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'switchSave',
          payload: payload,
        });
      }
      return response;
    },
    *initChannel(_, { call, put }) {
      const response = yield call(queryChannel);
      if (response && response.code === 1) {
        yield put({
          type: 'saveChannel',
          payload: response.data,
        });
      }
      return response;
    },
    *getOperationRecord({ payload }, { call, put }) {
      yield put({
        type: 'operaRecord',
        payload: [],
      });
      const response = yield call(queryOperation, payload);
      if (response && response.code === 1) {
        yield put({
          type: 'operaRecord',
          payload: response.data.pageList,
        });
        yield put({
          type: 'recordpagination',
          payload: {
            pageNumber: response.data.pageNumber,
            pageSize: response.data.pageSize,
            totalElements: response.data.totalElements,
          },
        });
      }
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
    record(state, action) {
      return {
        ...state,
        currentRecord: action.payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        currentRecord: action.payload,
      };
    },
    switchSave(state, action) {
      let tempbusinessData = state.businessData;
      let result = action.payload;
      tempbusinessData.map(item => {
        if (item.tenantId === result.tenantId) {
          item.status = result.status;
        }
        return item;
      });
      return {
        ...state,
        businessData: tempbusinessData,
      };
    },
    saveChannel(state, action) {
      return {
        ...state,
        channel: action.payload,
      };
    },
    operaRecord(state, action) {
      return {
        ...state,
        operaRecord: action.payload,
      };
    },
    recordpagination(state, action) {
      return {
        ...state,
        recordpagination: action.payload,
      };
    },
  },
};

export default businessAdm;
