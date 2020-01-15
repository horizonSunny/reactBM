import request from '@/utils/request';

// 获取商品种类数据
export async function categoryType(params: any) {
  return request('/admin/v1/category/getCategorys', {
    params: params,
  });
}
// 根据第三级分类id查询商品信息
export async function categoryProduct(params: any) {
  return request('/admin/v1/category/search/categoryProduct', {
    params: params,
  });
}
// 从分类中移除产品
export async function deleteCategory(params: any) {
  return request('/admin/v1/category/delete', {
    method: 'delete',
    data: params,
  });
}
// 分类顺序调整
export async function reorderCategory(params: any) {
  return request('/admin/v1/category/update/order', {
    method: 'PUT',
    data: params,
  });
}
// // 编辑商品
// export async function editorProduct(params: any) {
//   return request('/admin/v1/product', {
//     method: 'PUT',
//     data: params,
//   });
// }
