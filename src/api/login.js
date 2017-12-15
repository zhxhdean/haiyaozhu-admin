import ajax from './ajaxhelper'
import {LOGIN} from './interface'
import {NO_PASSWORD, SUCCESS} from './errorcode'
import {MISSING_PARAMETER} from './message'
import storage from '@/common/localstorage'

// 登录
// {
//   "code": 1,
//   "data": {
//     "UserLevel": 1,
//     "token": "admin:1ePn9z:yOEZoFqyQ__s4dAnUGhhSqauwY8",
//     "HotelId": 6,
//     "Uid": "1111111111111111111111111111111",
//     "HotelName": null
//   }
// }
function login(loginInfo) {
  const payload = {
    user: loginInfo.userName,
    passwd: loginInfo.userPwd
  }
  return ajax
    .post(LOGIN, payload)
    .then(response => {
      if (response.code === SUCCESS && response.data.token !== '') {
        saveToken(response.data.token)
      }
      if (response.code === NO_PASSWORD) {
        return MISSING_PARAMETER
      }
      return response.code
    })
}

// 客户端简单判断是否已登录状态
function isLogined() {
  const token = storage.get('token') || ''
  if (token === '') {
    return false
  }
  return true
}

// 保存token到storage
function saveToken(token) {
  if (token !== '') {
    storage.set('token', token)
  }
}

export default {
  login,
  isLogined
}
