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
