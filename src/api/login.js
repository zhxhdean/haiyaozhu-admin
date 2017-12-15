import ajax from './ajaxhelper'
import {LOGIN} from './interface'
import {NO_PASSWORD} from './errorcode'
import {MISSING_PARAMETER} from './message'

function login(loginInfo) {
  const payload = {
    user: loginInfo.userName,
    passwd: loginInfo.userPwd
  }
  return ajax
    .post(LOGIN, payload)
    .then(response => {
      if (response.code === NO_PASSWORD) {
        return MISSING_PARAMETER
      }
      return response.code
    })
}

export default {
  login
}
