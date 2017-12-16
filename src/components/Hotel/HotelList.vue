<template>
<div>
  <el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark">
    {{message}}
    </div></el-col>
</el-row>
</div>
</template>
<script>
export default {
  data () {
    return {
      message: '我是个酒店列表页面'
    }
  }
}
</script>