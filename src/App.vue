<template>
  <div id="app">
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#0052a7"
  text-color="#fff"
  :router="true"
  active-text-color="#fbbb05">
  <el-menu-item index="1" :route="{path: '/'}">首页</el-menu-item>
  <el-menu-item index="2" :route="{path: '/hotellist'}">酒店列表</el-menu-item>
  <el-menu-item index="3">酒店录入</el-menu-item>
  <el-menu-item index="4">退出系统</el-menu-item>
</el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
