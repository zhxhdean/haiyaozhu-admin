<template>
<div>
  <el-row style="height:10px"></el-row>
  <el-row type="flex" :gutter="10" align="middle">
    <el-col :span="1"></el-col>
    <el-col :span="1.5">酒店名:</el-col>
    <el-col :span="6">
    <el-input
    placeholder="请输入酒店名"
    prefix-icon="el-icon-search"
    v-model="hotelname">
  </el-input>
  </el-col>
  <el-col :span="2">
  <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </el-col>
</el-row>

  <el-table
    ref="multipleTable"
    :data="hotelList"
    tooltip-effect="dark"
    style="width: 100%"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <el-table-column
      prop="HotelName"
      label="酒店名称"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="HotelId"
      label="ID"
      width="50"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="Owner"
      label="录入员"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="UserName"
      label="酒店账号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="HotelTel"
      label="联系电话"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="最新订单"
      show-overflow-tooltip>
       <template slot-scope="scope">{{ scope.row.HasNewOrder === true ? '有' : '无' }}</template>
    </el-table-column>
    <el-table-column
      prop="Message"
      label="最新消息"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="状态"
      show-overflow-tooltip>
      <template slot-scope="scope"><span :class="{gray: !scope.row.IsValid}">{{ scope.row.IsValid === true ? '已上线' : '下线中' }}</span></template>
    </el-table-column>
    <el-table-column
      prop="CreateTime"
      label="录入时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="NewUserNum"
      label="新注册人数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import api from '@/api/hotel'
export default {
  data () {
    return {
      loading: true,
      hotelname: '',
      hotelList: [{
        CouponEffectDate: '',
        CouponExpDate: '',
        CreateTime: '',
        HasNewOrder: '',
        HotelId: 0,
        HotelName: '',
        HotelTel: '',
        HotelType: 0,
        IsGroup: false,
        IsValid: true,
        Message: 0,
        Name: '',
        NewUserNum: 0,
        Owner: '',
        UID: '',
        UserName: ''
      }],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  created () {
    api.getHotelList().then(response => {
      // 关闭loading
      this.loading = false
      this.hotelList = response.data
    })
  }
}
</script>
<style>
.gray {
  color:#eee
}
</style>