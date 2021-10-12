import Cookies from 'js-cookie'

const TokenKey = 'daliangqing-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove('token')
  return Cookies.remove(TokenKey)
}
