import request from '@/utils/request';

// 获取商品列表信息
export async function productList(params) {
  return request('/admin/v1/productList', {
    // method: 'GET',
    method: 'GET',
    body: {
      ...params,
    },
  });
}
