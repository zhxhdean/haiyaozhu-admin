import axios from 'axios'
import storage from '../common/localstorage'
axios.defaults.baseURL = 'http://m.haiyaozhu.com/openapi/admin'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.timeout = 3000
// axios.defaults.withCredentials = true

// 给参数包装上head
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
*/
function get(url, params) {
  const promise = axios
    .get(url, {params: setHeader(params)})
    .then(function (response) {})
    .catch(function (error) {
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
      return response.data
    }
  })
  .catch(function (error) {
    console.log(error)
  })
  return promise
}

export default {
  get,
  post
}
