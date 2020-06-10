import request from '@/utils/request';

// export async function insertBusiness(params) {
//   return request('/admin/v1/tenant', {
//     method: 'post',
//     data: params,
//   });
// }

// export async function saveBusiness(params) {
//   return request('/admin/v1/tenant', {
//     method: 'put',
//     data: params,
//   });
// }

// export async function switchStatus(params) {
//   return request('/admin/v1/tenant/status', {
//     method: 'put',
//     data: params,
//   });
// }

// export async function queryOperation(params) {
//   return request('/admin/v1/log', {
//     method: 'get',
//     params: params,
//   });
// }

// 燧人后台2.0期
export async function getWzOrderPage(params) {
  console.log('列表最终参数为:', params);
  return request('/patient/wzOrderBack/getWzOrderPage', {
    method: 'get',
    params: params,
  });
}

export async function getWzOrderDetails(params) {
  console.log('问诊单:', params);
  return request('/patient/wzOrderBack/getWzOrderDetails', {
    method: 'get',
    params: params,
  });
}
