import Cookies from 'js-cookie'

const TokenKey = 'DIANCAN_TOKEN'

// 获取凭证
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存储凭证
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除凭证
export function removeToken() {
  return Cookies.remove(TokenKey)
}
