// 登录/注册API模块
import request from '@/utils/request'

// 商家注册API
export const registerApi = data => request.post('/auth/register', data)

// 商家登录API
export const loginApi = data => request.post('/auth/login', data)
