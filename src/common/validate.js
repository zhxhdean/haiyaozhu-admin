// 是否为email
function isEmail(text) {
  return /`^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`/.test(text)
}

// 是否合法后台账号(3~20位字母数字)
function isUserName(text) {
  return /^[a-zA-Z0-9]{3,20}$/.test(text)
}

// 是否合法手机号
function isMobile(text) {
  return /^(1[3-9][0-9])\d{8}$/.test(text)
}

// 是否为中文字符
function isChinese(text) {
  return /^[\u4e00-\u9fff]{0,}$/.test(text)
}

// 是否合法的url
function isUrl(text) {
  // 'no-useless-escape'
  return /^http(s)?:\/\/[A-Za-z0-9-]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]:+!]*([^<>])*$/.test(text)
}

export default {
  isEmail,
  isUserName,
  isMobile,
  isChinese,
  isUrl
}
