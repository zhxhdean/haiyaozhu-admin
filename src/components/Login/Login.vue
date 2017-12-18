<template>
  <div class="login-form" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <input type="text" class="txt" placeholder="帐户" v-model="loginInfo.userName" />
    <input type="password" class="txt" placeholder="密码" v-model="loginInfo.userPwd" @keyup.enter="submit" />
    <input type="submit" class="btn" value="登 陆" @click="submit">
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  background-color: #323b55;
  background-image: -webkit-linear-gradient(
    bottom,
    #323b55 0%,
    top #424f71 100%
  );
  background-image: -moz-linear-gradient(bottom, #323b55 0%, top #424f71 100%);
  background-image: -o-linear-gradient(bottom, #323b55 0%, top #424f71 100%);
  background-image: -ms-linear-gradient(bottom, #323b55 0%, top #424f71 100%);
  background-image: linear-gradient(bottom, #323b55 0%, top #424f71 100%);
}

.login-form {
  width: 220px;
  height: 155px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -110px;
  margin-top: -75px;
  -webkit-animation: login 1s ease-in-out;
  -moz-animation: login 1s ease-in-out;
  -ms-animation: login 1s ease-in-out;
  -o-animation: login 1s ease-in-out;
  animation: login 1s ease-in-out;
}
.txt {
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 7px;
  font-size: 14px;
  color: #444;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.49);
  padding-left: 20px;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 6px;
  background: #fff;
  -webkit-box-shadow: inset 0px 2px 0px #d9d9d9;
  box-shadow: inset 0px 2px 0px #d9d9d9;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.txt:focus {
  -webkit-box-shadow: inset 0px 2px 0px #a7a7a7;
  box-shadow: inset 0px 2px 0px #a7a7a7;
}
.btn {
  width: 100%;
  height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0px -1px 0px #5b6ddc;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.49);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 6px;
  background-color: #5466da;
  background-image: -webkit-linear-gradient(
    bottom,
    #5466da 0%,
    top #768ee4 100%
  );
  background-image: -moz-linear-gradient(bottom, #5466da 0%, top #768ee4 100%);
  background-image: -o-linear-gradient(bottom, #5466da 0%, top #768ee4 100%);
  background-image: -ms-linear-gradient(bottom, #5466da 0%, top #768ee4 100%);
  background-image: linear-gradient(bottom, #5466da 0%, top #768ee4 100%);
  -webkit-box-shadow: inset 0px 1px 0px #9ab1ec;
  box-shadow: inset 0px 1px 0px #9ab1ec;
  cursor: pointer;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.btn:hover {
  background-color: #5f73e9;
  background-image: -webkit-linear-gradient(
    bottom,
    #5f73e9 0%,
    top #859bef 100%
  );
  background-image: -moz-linear-gradient(bottom, #5f73e9 0%, top #859bef 100%);
  background-image: -o-linear-gradient(bottom, #5f73e9 0%, top #859bef 100%);
  background-image: -ms-linear-gradient(bottom, #5f73e9 0%, top #859bef 100%);
  background-image: linear-gradient(bottom, #5f73e9 0%, top #859bef 100%);
  -webkit-box-shadow: inset 0px 1px 0px #aab9f4;
  box-shadow: inset 0px 1px 0px #aab9f4;
  margin-top: 2px;
  /*border-bottom-width: 6px;*/
}
.btn:active {
  background-color: #7588e1;
  background-image: -webkit-linear-gradient(
    bottom,
    #7588e1 0%,
    top #7184df 100%
  );
  background-image: -moz-linear-gradient(bottom, #7588e1 0%, top #7184df 100%);
  background-image: -o-linear-gradient(bottom, #7588e1 0%, top #7184df 100%);
  background-image: -ms-linear-gradient(bottom, #7588e1 0%, top #7184df 100%);
  background-image: linear-gradient(bottom, #7588e1 0%, top #7184df 100%);
  -webkit-box-shadow: inset 0px 1px 0px #93a9e9;
  box-shadow: inset 0px 1px 0px #93a9e9;
}
</style>
<script>
import api from '@/api/login'
import * as code from '@/api/errorcode'
import * as msg from '@/api/message'
export default {
  data() {
    return {
      loading: false,
      loginInfo: {
        userName: '',
        userPwd: ''
      }
    }
  },
  methods: {
    submit() {
      if (this.loginInfo.userName === '' || this.loginInfo.userPwd === '') {
        this.$message({
          showClose: true,
          message: msg.NO_ACCOUNT_OR_PASSWORD,
          type: 'error'
        })
        return
      }
      this.loading = true
      api.login(this.loginInfo).then(response => {
        this.loading = false
        if (response === code.SUCCESS) {
          // 登录成功
          location.href = '/index'
        } else {
          this.$message({
            showClose: true,
            message: response,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>