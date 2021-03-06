export default function filterProperty(obj) {
  let newObj = new Object();
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// 商品类别过滤器
let result: any;
export function filterStatus(status, obj) {
  obj.forEach(data => {
    if (data.value === status) {
      result = data.title;
    } else {
      data.children && data.children.length !== 0 && filterStatus(status, data.children);
    }
    // data.children && data.children.length !== 0 && filterStatus(status, [], data.children);
  });
  return result;
}

// 商品分类模块对三级分类做一个过滤
let resultClassify = {
  one: [],
  two: [],
  three: [],
};
export function filterClassify(obj, level = 0) {
  let levelInfo = level + 1;
  obj.forEach(data => {
    switch (levelInfo) {
      case 1:
        data['classify'] = 1;
        resultClassify['one'].push(data);
        break;
      case 2:
        data['classify'] = 2;
        resultClassify['two'].push(data);
        break;
      case 3:
        data['classify'] = 3;
        resultClassify['three'].push(data);
        break;
      default:
        break;
    }
    // level++;
    data.children && data.children.length !== 0 && filterClassify(data.children, levelInfo);
    // data.children && data.children.length !== 0 && filterStatus(status, [], data.children);
  });
  return resultClassify;
}

// 对商品分类做过滤生成带有key和value对分类
// 商品类别过滤器
export function filterStatusTree(obj, key = '') {
  obj.forEach(data => {
    data.value = key === '' ? data.id + '' : key + '_' + data.id;
    data.key = data.id + '';
    data.title = data.cateName;
    data.children && data.children.length !== 0 && filterStatusTree(data.children, data.value);
  });
  return obj;
}
// 对商品进行过滤，找出选中节点的父类节点
export function filterTreeStatus(obj, array, index = 0, resultTree?) {
  if (!resultTree) {
    resultTree = [];
  }
  obj.forEach(data => {
    if (data.key === array[index]) {
      resultTree.push({
        cateName: data.cateName,
        categoryId: data.id,
      });
      let newIndex = index + 1;
      array.length >= newIndex && filterTreeStatus(data.children, array, newIndex, resultTree);
    }
  });
  return resultTree;
}

// 深度比较两个对象是否相等
function getType(data) {
  return Object.prototype.toString
    .call(data)
    .substring(8)
    .split(/]/)[0];
}
export function comparisonObject(sourceObj, compareObj) {
  if (arguments.length < 2) throw 'Incorrect number of parameters';
  let sourceType = getType(sourceObj);
  if (sourceType !== getType(compareObj)) return false;
  // Not objects and arrays
  if (
    sourceType !== 'Array' &&
    sourceType !== 'Object' &&
    sourceType !== 'Set' &&
    sourceType !== 'Map'
  ) {
    if (sourceType === 'Number' && sourceObj.toString() === 'NaN') {
      return compareObj.toString() === 'NaN';
    }
    if (sourceType === 'Date' || sourceType === 'RegExp') {
      return sourceObj.toString() === compareObj.toString();
    }
    return sourceObj === compareObj;
  } else if (sourceType === 'Array') {
    if (sourceObj.length !== compareObj.length) return false;
    if (sourceObj.length === 0) return true;
    for (let i = 0; i < sourceObj.length; i++) {
      if (!comparisonObject(sourceObj[i], compareObj[i])) return false;
    }
  } else if (sourceType === 'Object') {
    let sourceKeyList = Reflect.ownKeys(sourceObj);
    let compareKeyList = Reflect.ownKeys(compareObj);
    let key;
    if (sourceKeyList.length !== compareKeyList.length) return false;
    for (let i = 0; i < sourceKeyList.length; i++) {
      key = sourceKeyList[i];
      if (key !== compareKeyList[i]) return false;
      if (!comparisonObject(sourceObj[key], compareObj[key])) return false;
    }
  } else if (sourceType === 'Set' || sourceType === 'Map') {
    // 把 Set Map 转为 Array
    if (!comparisonObject(Array.from(sourceObj), Array.from(compareObj))) return false;
  }
  return true;
}

// 对商品分类做过滤生成带有key和value对分类 同时对父节点设置disabled
// 商品类别过滤器
export function filterStatusDiabTree(obj, key = '', level = 0) {
  let levelInfo = level + 1;
  obj.forEach(data => {
    switch (levelInfo) {
      case 1:
        data['classify'] = 1;
        break;
      case 2:
        data['classify'] = 2;
        break;
      case 3:
        data['classify'] = 3;
        break;
      default:
        break;
    }
    data.value = key === '' ? data.id + '' : key + '_' + data.id;
    data.key = data.id + '';
    data.title = data.cateName;
    data.disabled = data['classify'] === 3 ? false : true;
    if (data.children && data.children.length !== 0) {
      data.disabled = true;
      filterStatusDiabTree(data.children, data.value, levelInfo);
    }
  });
  return obj;
}
