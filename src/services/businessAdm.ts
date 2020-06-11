import request from '@/utils/request';

export async function queryBusiness(params) {
  console.log('列表最终参数为:', params);
  return request('/admin/v1/tenant', {
    method: 'get',
    params: params,
  });
}

export async function insertBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'post',
    data: params,
  });
}

export async function saveBusiness(params) {
  return request('/admin/v1/tenant', {
    method: 'put',
    data: params,
  });
}

export async function switchStatus(params) {
  return request('/admin/v1/tenant/status', {
    method: 'put',
    data: params,
  });
}

export async function queryChannel() {
  return request('/admin/v1/tenant/channel', {
    method: 'get',
  });
}

export async function queryOperation(params) {
  return request('/admin/v1/log', {
    method: 'get',
    params: params,
  });
}
// 供应商管理／医生模块
// 获取医生列表
export async function getDoctorPage(params) {
  return request('/doctor/doctorBack/getDoctorPage', {
    method: 'get',
    params: params,
  });
}
// 获取医生详情
export async function getDoctorDetails(params) {
  return request('/doctor/doctorBack/getDoctorDetails', {
    method: 'get',
    params: params,
  });
}
// 修改医生服务状态
export async function upDoctorStatus(params) {
  return request('/doctor/doctorBack/upDoctorStatus', {
    method: 'post',
    data: params,
  });
}
// 医生审核
export async function auditDoctor(params) {
  return request('/doctor/doctorBack/auditDoctor', {
    method: 'post',
    data: params,
  });
}
// 供应商管理／医疗机构模块
// 获取医院机构列表
export async function getHospitalPage(params) {
  return request('/doctor/hospitalBack/getHospitalPage', {
    method: 'get',
    params: params,
  });
}
//获取医院详情信息
export async function getHospitalDetails(params) {
  return request('/doctor/hospitalBack/getHospitalDetails', {
    method: 'get',
    params: params,
  });
}
//医院审核
export async function auditHospital(params) {
  return request('/doctor/hospitalBack/auditHospital', {
    method: 'post',
    data: params,
  });
}
//新增/编辑
export async function saveHospital(params) {
  return request('/doctor/hospitalBack/saveHospital', {
    method: 'post',
    data: params,
  });
}
//修改医院服务状态
export async function upHospitalStatus(params) {
  return request('/doctor/hospitalBack/upHospitalStatus', {
    method: 'post',
    data: params,
  });
}
