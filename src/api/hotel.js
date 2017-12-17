import ajax from './ajaxhelper'
import { HOTEL_LIST } from './interface'
import login from './login'
import { SUCCESS } from './errorcode'

// 获取酒店列表
function getHotelList (condition = {}) {
  const payload = {
    keyword: condition.keyword || '',
    pageindex: condition.pageindex || 1,
    user: login.getUser()
  }
  return ajax.post(HOTEL_LIST, payload)
    .then(response => {
      if (response.code === SUCCESS) {
        return response.data
      }
    })
}

export default {
  getHotelList
}
