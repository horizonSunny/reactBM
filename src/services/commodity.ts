import request from '@/utils/request';

// 获取商品列表信息
export async function productList(params: Object) {
  return request('/admin/v1/productList', {
    params: params,
  });
}
// 根据id查询商品信息
export async function product(params: any) {
  return request('/admin/v1/product/' + params['id']);
}
