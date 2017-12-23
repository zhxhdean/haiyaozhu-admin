<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#0052a7" text-color="#fff" :router="true" active-text-color="#fbbb05">
      <el-menu-item index="1" :route="{path: '/index'}">首页</el-menu-item>
      <el-menu-item index="2" :route="{path: '/hotellist'}">酒店列表</el-menu-item>
      <el-menu-item index="3" :route="{path: '/hotel'}">酒店录入</el-menu-item>
    </el-menu>
    <el-button style="top: 10px;
    position: absolute;
    right: 20px;" icon="el-icon-circle-close" @click="logout">退出系统</el-button>
    <router-view/>
  </div>
</template>

<script>
import { activeMenuIndex } from '@/common/urls'
import login from '@/api/login'
import storage from '@/common/localstorage'
export default {
  data() {
    return {
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '2') {
        storage.set('currentPage', 1)
      }
      this.$store.state.hotelID = 0
    },
    logout() {
      this.$confirm('你正在退出后台管理系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        login.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created() {
    // 页面直进，设置menu active
    this.activeIndex = activeMenuIndex(this.$route.path)
  },
  computed: {
    activeIndex: {
      get() {
        return this.$store.state.activeIndex
      },
      set() {
      }
    }
  }
}
</script>


