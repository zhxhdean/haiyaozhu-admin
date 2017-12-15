# haiyaozhu-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录说明
    1.src/api存放调用业务接口的js
    2.src/common存放公共js
    3.src/components存放页面
    4.src/router存放路由

## 文件说明
    1.api/ajaxhelper.js 发送ajax接口,只供api下业务js调用
    2.api/errorcode.js 错误code
    3.api/message.js 错误信息,供ui提示使用
    4.api/interface.js api接口名集合
    5.common/localstorage.js localstorage封装
    6.common/cookie.js cookie封装
    7.common/validate.js 验证封装
