import ajax from './ajaxhelper'
import {HOTEL_LIST, HOTEL_VALIDATE, QRCODE, IMAGE_DELETE} from './interface'
import login from './login'
import {SUCCESS, ERROR, TIMEOUT} from './errorcode'
import {UNKNOW_ERROR, NETWORK_TIMEOUT, SUCCESS_ACTION, FAIL_ACTION} from './message'
// 获取酒店列表
function getHotelList(condition = {}) {
  const payload = {
    keyword: condition.hotelName || '',
    pageindex: condition.pageIndex || 1,
    user: login.getUser()
  }
  return ajax
    .post(HOTEL_LIST, payload)
    .then(response => {
      if (response.code === SUCCESS) {
        return response.data
      } else if (response.code === ERROR) {
        return UNKNOW_ERROR
      } else if (response.code === TIMEOUT) {
        return NETWORK_TIMEOUT
      }
      return response
    })
}

// 设置酒店上下线
function setHotelValidate(hotels, online) {
  const payload = {
    ids: hotels,
    status: online === true
      ? 1
      : 0
  }
  return ajax
    .post(HOTEL_VALIDATE, payload)
    .then(response => {
      if (response.data === SUCCESS) {
        return SUCCESS_ACTION
      }
      return FAIL_ACTION
    })
}

// 获取酒店二维码
function getHotelQRCode(hotelID) {
  const payload = {
    hotelid: hotelID
  }
  return ajax
    .get(QRCODE, payload, false)
    .then(response => {
      if (response.code === SUCCESS) {
        return response.data
      } else if (response.code === ERROR) {
        return UNKNOW_ERROR
      } else if (response.code === TIMEOUT) {
        return NETWORK_TIMEOUT
      }
    })
}
// 删除图片
function deleteHotelImage(params) {
  const payload = {
    hoteluid: params.uid,
    hotelid: params.hotelID,
    imageid: params.id
  }
  return ajax.post(IMAGE_DELETE, payload)
  .then(response => {
    if (response.code === SUCCESS) {
      return SUCCESS
    } else if (response.code === ERROR) {
      return UNKNOW_ERROR
    } else if (response.code === TIMEOUT) {
      return NETWORK_TIMEOUT
    }
  })
}
export default {
  getHotelList,
  setHotelValidate,
  getHotelQRCode,
  deleteHotelImage
}
