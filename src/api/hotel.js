import ajax from './ajaxhelper'
import {HOTEL_LIST, HOTEL_VALIDATE, QRCODE, IMAGE_DELETE, HOTEL_ADD_EDIT, HOTEL_DETAIL} from './interface'
import login from './login'
import {SUCCESS, ERROR, TIMEOUT} from './errorcode'
import {UNKNOW_ERROR, NETWORK_TIMEOUT, SUCCESS_ACTION, FAIL_ACTION} from './message'
// 获取单个酒店
function getHotel(hotelID) {
  return ajax.post(HOTEL_DETAIL, {hotelid: hotelID})
  .then(response => {
    if (response.code === SUCCESS) {
      const data = response.data
      return {
        hotelID: hotelID,
        uid: data.Uid,
        hotelName: data.HotelName,
        hotelAddress: data.HotelAddress,
        hotelTel: data.HotelTel,
        cityID: data.CityId,
        hotelType: data.HotelType,
        hotelUrl: data.HotelUrl || '',
        weChatUrl: data.WeChatUrl || '',
        imageID: 0,
        groupID: (data.HotelGroup && data.HotelGroup.GroupId) || 0,
        star: data.Star,
        isPriority: data.Priority,
        isCover: false,
        hotelDesc: data.HotelDesc || '',
        hotelPromotions: (data.HotelPromotionInfos && data.HotelPromotionInfos.map((value, index, arr) => {
          return {
            couponEffectDate: value.CouponEffectDate,
            couponExpDate: value.CouponExpDate,
            couponCode: value.CouponCode,
            couponPolicy: value.CouponPolicy,
            recommendShortText: value.RecommedShortText,
            recommendText: value.MembershipDiscount
          }
        })) || [],
        images: data.HotelImageList
      }
    } else if (response.code === ERROR) {
      return UNKNOW_ERROR
    } else if (response.code === TIMEOUT) {
      return NETWORK_TIMEOUT
    }
  })
}
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
// 录入酒店
function saveHotel(params) {
  const payload = {
    hotelid: params.hotelID,
    action: params.hotelID === 0 ? 0 : 1, // 0:新增,1:修改
    name: params.hotelName,
    address: params.hotelAddress,
    tel: params.hotelTel,
    desc: params.hotelDesc,
    hoteltype: params.hotelType,
    qrcode: params.weChatUrl,
    imageid: params.imageID,
    hotelurl: params.hotelUrl,
    cityid: params.cityID,
    owner: login.getUser().userName,
    star: params.star,
    groupid: params.groupID,
    isgroup: false,
    refcity: [],
    priority: params.isPriority === true ? 1 : 0,
    iscover: params.isCover,
    promotions: params.hotelPromotions.map((value, index, arr) => {
      return {
        CouponCode: value.couponCode,
        CouponPolicy: value.couponPolicy,
        CouponEffectDate: value.couponEffectDate,
        CouponExpDate: value.couponExpDate,
        RecommedShortText: value.recommendShortText,
        MembershipDiscount: value.recommendText
      }
    })
  }
  return ajax.post(HOTEL_ADD_EDIT, payload)
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
  getHotel,
  getHotelList,
  setHotelValidate,
  getHotelQRCode,
  deleteHotelImage,
  saveHotel
}
