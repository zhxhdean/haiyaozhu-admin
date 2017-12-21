/* 页面路由地址集合 */
// 首页
export const INDEX = '/index'
// 酒店列表
export const HOTEL_LIST = '/hotellist'
// 登录页
export const LOGIN_PAGE = '/login'
// 酒店录入
export const HOTEL_ADD_OR_EDIT = '/hotel/'
// url映射对应的activeindex
function activeIndex (path) {
  console.log(path)
  if (path.includes(INDEX)) {
    return '1'
  } else if (path.includes(HOTEL_LIST)) {
    return '2'
  } else if (path.includes(HOTEL_ADD_OR_EDIT)) {
    return '3'
  }
}

export default {
  activeIndex
}
