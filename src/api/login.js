import ajax from './ajaxhelper'
import { LOGIN } from './interface'
import { NO_PASSWORD, SUCCESS, ERROR } from './errorcode'
import { MISSING_PARAMETER, ERORR_ACCOUNT_OR_PASSWORD } from './message'
import storage from '@/common/localstorage'
import utils from '@/common/utils'

// 登录
function login (loginInfo) {
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
        saveUser(response.data)
        return SUCCESS
      }
      if (response.code === NO_PASSWORD) {
        return MISSING_PARAMETER
      } else if (response.code === ERROR) {
        return ERORR_ACCOUNT_OR_PASSWORD
      }
      return response.UNKNOW_ERROR
    })
}

// 客户端简单判断是否已登录状态
function isLogined () {
  const token = storage.get('token') || ''
  if (token === '') {
    return false
  }
  return true
}

// 保存token到storage
function saveToken (token) {
  if (token !== '') {
    storage.set('token', token)
  }
}

// 获取用户对象
function getUser () {
  return storage.get('user')
}

// 保存登陆信息
function saveUser (user) {
  if (utils.isJSON(user) && user !== '') {
    storage.set('user', {
      hotelid: user.HotelId,
      uid: user.Uid,
      hotel_name: user.HotelName || '',
      level: user.UserLevel
    })
  }
}

export default {
  login,
  isLogined,
  getUser
}
