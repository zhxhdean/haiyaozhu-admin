import {HOTEL_GROUP} from './interface'
import storage from '@/common/localstorage'
import ajax from './ajaxhelper'
import {SUCCESS, ERROR, TIMEOUT} from './errorcode'
import {UNKNOW_ERROR, NETWORK_TIMEOUT} from './message'

function getHotelGroups () {
  const groups = storage.get('group') || ''
  if (groups === '') {
    return ajax.get(HOTEL_GROUP, {})
    .then(response => {
      if (response.code === SUCCESS) {
        // 放入localstorage
        storage.set('group', response.data)
        return response
      } else if (response.code === ERROR) {
        return UNKNOW_ERROR
      } else if (response.code === TIMEOUT) {
        return NETWORK_TIMEOUT
      }
    })
  }
  return new Promise((resolve, reject) => {
    resolve({code: SUCCESS, data: groups})
  })
}
export default {
  getHotelGroups
}
