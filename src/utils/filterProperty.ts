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
  console.log('array_info_', array);
  if (!resultTree) {
    resultTree = [];
  }
  obj.forEach(data => {
    if (data.key === array[index]) {
      console.log('data.cateName_', data.cateName);
      resultTree.push({
        name: data.cateName,
        id: data.id,
      });
      let newIndex = index + 1;
      array.length >= newIndex && filterTreeStatus(data.children, array, newIndex, resultTree);
    }
  });
  return resultTree;
}
