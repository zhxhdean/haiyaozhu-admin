<template>
  <div>
    <el-row style="height:10px"></el-row>
    <el-row type="flex" :gutter="10" align="middle">
      <el-col :span="1"></el-col>
      <el-col :span="1.5">酒店名:</el-col>
      <el-col :span="6">
        <el-input placeholder="请输入酒店名" prefix-icon="el-icon-search" v-model="hotelName" @keyup.enter.native="search">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="showDialog(true)" v-if="user.userName==='admin'">上线</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="showDialog(false)" v-if="user.userName==='admin'">下线</el-button>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center v-loading="loading">
      <span>请确认{{online === true ? '上线' : '下线'}}选中的酒店</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOrOff">确 定</el-button>
      </span>
    </el-dialog>
    <el-row style="height:10px"></el-row>
    <el-table ref="multipleTable" :data="hotelList" empty-text="暂无数据" tooltip-effect="dark" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="HotelName" width="300" label="酒店名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="HotelId" label="ID" width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Owner" label="录入员" width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="UserName" label="酒店账号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="HotelTel" label="联系电话" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="最新订单" width="80" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.HasNewOrder === true ? '有' : '无' }}</template>
      </el-table-column>
      <el-table-column prop="Message" width="80" label="最新消息" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" width="80" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="{gray: !scope.row.IsValid}">{{ scope.row.IsValid === true ? '已上线' : '下线中' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="录入时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="NewUserNum" width="90" label="新注册人数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share" @click="showQRCode(scope.row.HotelId,$event)" :loading="false"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px;text-align:center;">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="20" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import hotel from '@/api/hotel'
import utils from '@/common/utils'
import login from '@/api/login'
import { SUCCESS_ACTION } from '@/api/message'
export default {
  data() {
    return {
      loading: true,
      online: true,
      dialogVisible: false,
      user: { userName: '' },
      hotelName: '',
      hotelList: [],
      total: 0,
      currentPage: 1,
      // 选中酒店ID
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val.map((value, index, arr) => {
        return value.HotelId
      })
      // console.log(this.multipleSelection)
    },
    showQRCode(hotelID, $event) {
      hotel.getHotelQRCode(hotelID).then(
        response => {
          if (utils.isJSON(response)) {
            console.log(response.imgurl)
          } else {
            this.$notify.warning({
              title: '警告',
              message: response
            })
          }
        }
      )
    },
    showDialog(online) {
      if (this.multipleSelection.length === 0) {
        this.$notify.warning({
          title: '警告',
          message: '你没有选择任何酒店'
        })
        return false
      }
      this.online = online
      this.dialogVisible = true
    },
    // 上、下线
    onOrOff() {
      this.dialogVisible = false
      this.loading = true
      hotel.setHotelValidate(this.multipleSelection, this.online)
        .then(response => {
          this.loading = false
          this.$notify({
            type: response === SUCCESS_ACTION ? 'success' : 'error',
            title: response === SUCCESS_ACTION ? '成功' : '错误',
            message: response
          })
          if (response === SUCCESS_ACTION) {
            // 重新渲染数据
            this.getHotelList()
          }
        })
    },
    // 搜索
    search() {
      this.currentPage = 1
      this.getHotelList()
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = +val
      this.getHotelList()
    },
    // 获取列表数据
    getHotelList() {
      let condition = {
        pageIndex: this.currentPage,
        hotelName: this.hotelName
      }
      hotel.getHotelList(condition).then(response => {
        // 关闭loading
        this.loading = false
        if (utils.isJSON(response)) {
          this.hotelList = response.data
          this.total = response.total
        } else {
          this.$message({
            showClose: true,
            message: response,
            type: 'error'
          })
        }
      })
    }
  },
  created() {
    this.user = login.getUser() || {}
    this.getHotelList()
  }
}
</script>
<style>
.gray {
  color: #eee;
}
</style>