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
        resultClassify['one'].push(data);
        break;
      case 2:
        resultClassify['two'].push(data);
        break;
      case 3:
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
