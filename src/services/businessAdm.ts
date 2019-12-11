import request from '@/utils/request';

export async function queryBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'get',
    params: params,
  });
}

export async function insertBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'post',
    data: params
  });
}

export async function saveBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'put',
    data: params
  });
}
