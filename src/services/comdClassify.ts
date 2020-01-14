import request from '@/utils/request';

// 获取商品种类数据
export async function categoryType() {
  return request('/admin/v1/category/productype');
}
// 根据id查询商品信息
// export async function product(params: any) {
//   return request('/admin/v1/product/' + params['id']);
// }
// // 编辑商品
// export async function editorProduct(params: any) {
//   return request('/admin/v1/product', {
//     method: 'PUT',
//     data: params,
//   });
// }
