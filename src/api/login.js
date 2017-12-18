import ajax from './ajaxhelper'
import {LOGIN} from './interface'
import {NO_PASSWORD, SUCCESS, ERROR} from './errorcode'
import {MISSING_PARAMETER, ERORR_ACCOUNT_OR_PASSWORD, UNKNOW_ERROR} from './message'
import storage from '@/common/localstorage'
import utils from '@/common/utils'
import {LOGIN_PAGE} from '@/common/urls'
// 登录
function login(loginInfo) {
  const payload = {
    user: loginInfo.userName,
    passwd: loginInfo.userPwd
  }
  return ajax
    .post(LOGIN, payload)
    .then(response => {
      if (response.code === SUCCESS && response.data.token !== '') {
        // 保存token
        saveToken(response.data.token)
        saveUser(response.data, loginInfo.userName)
        return SUCCESS
      }
      if (response.code === NO_PASSWORD) {
        return MISSING_PARAMETER
      } else if (response.code === ERROR) {
        return ERORR_ACCOUNT_OR_PASSWORD
      }
      return UNKNOW_ERROR
    })
}

// 退出
function logout() {
  storage.remove('token')
  storage.remove('user')
  location.href = LOGIN_PAGE
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

// 获取用户对象
function getUser() {
  return storage.get('user')
}

// 保存登陆信息
function saveUser(userInfo, userName) {
  if (utils.isJSON(userInfo) && userInfo !== '') {
    storage.set('user', {
      hotelID: userInfo.HotelId,
      uid: userInfo.Uid,
      hotelName: userInfo.HotelName || '',
      level: userInfo.UserLevel,
      userName: userName
    })
  }
}

export default {
  login,
  isLogined,
  getUser,
  logout
}
