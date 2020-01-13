import request from '@/utils/request';

// 获取快速去要列表list集合
export async function getCategoryList(params: Object) {
  return request('/admin/v1/quickCategory/list', {
    params: params,
  });
}
// 快速分类顺序调整
export async function reverseCategoryList(params: Object) {
  return request('/admin/v1/quickCategory/update/order', {
    method: 'put',
    data: params,
  });
}
// 删除快速分类
export async function deleteCategoryItem(params: Object) {
  return request('/admin/v1/quickCategory/delete/' + params['quickCategoryId'], {
    method: 'delete',
  });
}
// 新增接口
export async function newCategoryItem(params: Object) {
  return request('/admin/v1/quickCategory/insert', {
    method: 'post',
    data: params,
  });
}
