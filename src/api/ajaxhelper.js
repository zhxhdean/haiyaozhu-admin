import axios from 'axios'
import storage from '../common/localstorage'
import {TIMEOUT, TOKEN_ERROR} from './errorcode'
axios.defaults.baseURL = 'http://m.haiyaozhu.com/openapi'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true 给参数包装上head
function setHeader(params) {
  let payload = {
    head: {
      hotelid: storage.get('hotelid') || 0,
      token: storage.get('token') || 'admin:1ePh0o:icXaHIAX4i4LA7XZwIzrfCyf-3c'
    },
    ...params
  }
  return payload
}

// 发送get类型的ajax请求
/* @url: 请求接口名（/getlist)
  @params: 请求参数 {name: '你好', age: 20}
  @headers: 默认需要增加header
*/
function get(url, params, headers = true) {
  const promise = axios.get(url, {
    params: headers === true
      ? setHeader(params)
      : params
  })
    .then(function (response) {
      if (response.status === 200 && response.statusText === 'OK') {
        if (response.data.code === TOKEN_ERROR) {
          return TOKEN_ERROR
        }
        return response.data
      }
    })
    .catch(function (error) {
      if (error.code === TIMEOUT) {
        return {code: TIMEOUT}
      }
      console.log(error)
    })
  return promise
}

// 发送post类型的ajax请求
/* @url: 请求接口名（/getlist)
  @params: 请求参数 {name: '你好', age: 20}
*/
function post(url, params) {
  const promise = axios
    .post(url, setHeader(params))
    .then(function (response) {
      if (response.status === 200 && response.statusText === 'OK') {
        if (response.data.code === TOKEN_ERROR) {
          return TOKEN_ERROR
        }
        return response.data
      }
    })
    .catch(function (error) {
      if (error.code === TIMEOUT) {
        return {code: TIMEOUT}
      }
      console.log(error)
    })
  return promise
}

export default {
  get,
  post
}
