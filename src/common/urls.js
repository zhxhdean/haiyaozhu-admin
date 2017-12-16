// 首页
export const INDEX = '/index'
// 酒店列表
export const HOTEL_LIST = '/hotellist'

// url映射对应的activeindex
function activeIndex (path) {
  if (path.includes(INDEX)) {
    return '1'
  } else if (path.includes(HOTEL_LIST)) {
    return '2'
  }
}

export default {
  activeIndex
}
