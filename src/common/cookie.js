
function getCookie(name) {
  let start = document
    .cookie
    .indexOf(name + '=')
  let len = start + name.length + 1
  if ((!start) && (name !== document.cookie.substring(0, name.length))) {
    return null
  }
  if (start === -1) {
    return null
  }

  let end = document
    .cookie
    .indexOf('', len)
  if (end === -1) {
    end = document.cookie.length
  }
  return unescape(document.cookie.substring(len, end))
}

function setCookie(name, value, expires, path, domain, secure) {
  let today = new Date()
  today.setTime(today.getTime())
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24
  }
  let expiresdate = new Date(today.getTime() + (expires))
  document.cookie = name + '=' + escape(value) + ((expires)
    ? 'expires=' + expiresdate.toGMTString()
    : '') + ((path)
    ? 'path=' + path
    : '') + ((domain)
    ? 'domain=' + domain
    : '') + ((secure)
    ? 'secure'
    : '')
}

function deleteCookie(name, path, domain) {
  if (document.cookie.getCookie(name)) {
    document.cookie = name + '=' + ((path)
      ? 'path=' + path
      : '') + ((domain)
      ? 'domain=' + domain
      : '') + 'expires=Thu, 01-Jan-1970 00:00:01 GMT'
  }
}

export default{
  getCookie,
  setCookie,
  deleteCookie
}
