import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/auth/oauth/token', {
  //   method: 'POST',
  //   data: {
  //     username: 'admin',
  //     password: 'elcrD28ZSLLtR0VLs/jERA==',
  //     grant_type: 'password',
  //     scope: 'server',
  //     userType: 1,
  //   },
  // });
  return request('/admin/province/city?status=1');
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
