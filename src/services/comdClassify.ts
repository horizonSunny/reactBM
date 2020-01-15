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
// // 编辑商品
// export async function editorProduct(params: any) {
//   return request('/admin/v1/product', {
//     method: 'PUT',
//     data: params,
//   });
// }
