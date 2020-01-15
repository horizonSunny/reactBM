import { Effect } from 'dva';
import { Reducer } from 'redux';

// 以下是mock数据
import classifyInfo, { commodityMessage } from '../../mock/commdityClassify';
import { categoryType, categoryProduct } from '@/services/comdClassify';

import { filterClassify } from '@/utils/filterProperty';

function findChildren(data, id) {
  let item = data.find(item => item.id === id);
  return item['children'];
}
const CommodityModel = {
  namespace: 'commodityClassify',
  state: {
    // 分类下的商品
    commodityInfo: commodityMessage.data,
    // 分类下商品的查询关键字
    searchKeyword: '',
    // 是否切换分类类,true代表刷新完,false代表刚分类切换过
    isSwitchover: true,
    selectedRowKeys: [],
  },
  effects: {
    // 获取分类类型,对分类类型进行切分,化为分别的三级分类样式
    *classification({ payload, callback }, { call, put }) {
      const response = yield call(categoryType, {
        status: 0,
      });
      yield put({
        type: 'sortCas',
        payload: response,
      });
    },
    // 选中分类，改变分类选中项，同时发送请求查找最新商品
    *selectCas({ payload, callback }, { select, call, put }) {
      console.log('inSelectcas_', payload);
      yield put({
        type: 'selectCasIn',
        payload: payload,
      });
      const state = yield select(state => state);
      const id = state.commodityClassify.casThreeId;
      let response;
      if (id) {
        response = yield call(categoryProduct, {
          categoryId: id,
          pageNumber: 0,
          pageSize: 10000,
          status: 0,
        });
      } else {
        response = {
          data: {
            pageList: [],
          },
        };
      }
      // 清空数据
      yield put({
        type: 'modifyCommodity',
        payload: [],
      });
      // 放入刷新获取的数据
      yield put({
        type: 'resetCommodity',
        payload: response.data,
      });
    },
    // 移除选中药品
    *removeCommodity(_, { select, call, put }) {
      // 清空选中数据
      yield put({
        type: 'modifyCommodity',
        payload: [],
      });
    },
  },

  reducers: {
    // 对传过来的值递归进行一,二,三级的分类
    sortCas(state, action) {
      // const commdityClassify = filterClassify(state.classifyInfo.data);
      const info = action.payload;
      const obj = {
        casOneId: info.data[0]['id'],
        casTwoId: info.data[0]['children'][0]['id'],
        casThreeId: info.data[0]['children'][0]['children'][0]['id'],
        // 当前三级分类各级对应id
        casInfoOne: info.data,
        casInfoTwo: info.data[0]['children'],
        casInfoThree: info.data[0]['children'][0]['children'],
      };
      const commdityClassify = filterClassify(info.data);
      return {
        ...state,
        ...commdityClassify,
        ...obj,
      };
    },
    // 对分类位置进行变换
    reverseCas(state, action) {
      const info = action.payload;
      let reverseArr;
      let item;
      switch (info.classify) {
        case 1:
          reverseArr = state.casInfoOne;
          break;
        case 2:
          reverseArr = state.casInfoTwo;
          break;
        case 3:
          reverseArr = state.casInfoThree;
          break;
        default:
          break;
      }
      item = reverseArr[info.dragIndex];
      reverseArr[info.dragIndex] = reverseArr[info.hoverIndex];
      reverseArr[info.hoverIndex] = item;
      return {
        ...state,
      };
    },
    // 选中分类类别
    selectCasIn(state, action) {
      console.log('action.payload_', action.payload);
      const Obj = new Object();
      switch (action.payload.classify) {
        case 1:
          // 下面是对选中后1，2，3级类别进行修改
          Obj['casInfoTwo'] = findChildren(state.casInfoOne, action.payload.id);
          Obj['casInfoThree'] = Obj['casInfoTwo'][0]['children'];
          //下面是对当前选中id值进行修改
          Obj['casOneId'] = action.payload.id;
          Obj['casTwoId'] = Obj['casInfoTwo'][0]['id'];
          Obj['casThreeId'] = Obj['casInfoTwo'][0]['children'][0]['id'];
          break;
        case 2:
          Obj['casInfoThree'] = findChildren(state.casInfoTwo, action.payload.id);
          Obj['casTwoId'] = action.payload.id;
          Obj['casThreeId'] = Obj['casInfoThree'][0] ? Obj['casInfoThree'][0]['id'] : '';
          break;
        case 3:
          Obj['casThreeId'] = action.payload.id;
          break;
        default:
          break;
      }
      console.log('Obj_', Obj);
      return {
        ...state,
        ...Obj,
      };
    },
    // 拖起的时候获取拖起对应的分类目标
    dragStart(state, action) {
      // 必须是同步的
      console.log('onDrag_', action.payload);
      let dragStart = action.payload;
      return {
        ...state,
        dragStart,
      };
    },
    // 修改查询关键字
    modifyKeyWord(state, action) {
      let searchValue = action.payload;
      console.log('searchValue_', action.payload);
      return {
        ...state,
        searchKeyword: searchValue,
      };
    },
    // 移除选中的药物
    removeCommodity(state, action) {
      const selectArr = action.payload;
      const removeEndArr = state.commodityInfo.pageList.filter(item => {
        return !selectArr.includes(item['productId']);
      });
      const obj = {
        ...state.commodityInfo,
        pageList: removeEndArr,
      };
      return {
        ...state,
        commodityInfo: obj,
      };
    },
    // 修改药物列表
    resetCommodity(state, action) {
      console.log('action_resetCommodity_', action);
      return {
        ...state,
        commodityInfo: action.payload,
      };
    },
    // 修改刷新状态
    modifySwitchover(state, action) {
      return {
        ...state,
        isSwitchover: action.payload,
      };
    },
    // 修改清空选中商品数据
    modifyCommodity(state, action) {
      console.log('action_modifyCommodity_', action.payload);
      return {
        ...state,
        selectedRowKeys: action.payload,
      };
    },
  },
};

export default CommodityModel;
