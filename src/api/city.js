import ajax from './ajaxhelper'
import storage from '@/common/localstorage'
import {CITY} from './interface'
import {SUCCESS, ERROR, TIMEOUT} from './errorcode'
import {UNKNOW_ERROR, NETWORK_TIMEOUT} from './message'
// 获取城市
function getCities() {
  const cities = storage.get('city') || ''
  if (cities === '') {
    return ajax.get(CITY, {}).then(
      response => {
        if (response.code === SUCCESS) {
          // 放入localstorage
          storage.set('city', response.data)
          return response
        } else if (response.code === ERROR) {
          return UNKNOW_ERROR
        } else if (response.code === TIMEOUT) {
          return NETWORK_TIMEOUT
        }
      }
    )
  }
  return new Promise((resolve, reject) => {
    resolve({code: SUCCESS, data: cities})
  })
}
export default {
  getCities
}
