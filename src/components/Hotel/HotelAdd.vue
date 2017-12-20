<template>
  <div class="form">
    <el-form label-width="90px" :model="hotelform" ref="hotelform">
      <el-form-item label="酒店名称" prop="hotelName" :rules="[{ required: true, message: '酒店名不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelName" placeholder="请输入酒店名称" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="酒店地址" prop="hotelAddress" :rules="[{ required: true, message: '酒店地址不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelAddress" placeholder="请输入酒店地址" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="酒店电话" prop="hotelTel" :rules="[{ required: true, message: '酒店电话不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelTel" placeholder="请输入酒店电话" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="cityID">
        <el-cascader :options="formatCity" v-model="selectedCity" @change="choicedCity" :props="props" expand-trigger="hover" size="medium"></el-cascader>
      </el-form-item>
      <el-form-item label="酒店类型" prop="hotelType">
        <el-radio-group v-model="hotelform.hotelType" @change="loadTextOrUpload">
          <el-radio :label="1">酒店官网</el-radio>
          <el-radio :label="2">酒店公众号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="hotelform.hotelType===1">
        <el-input v-model="hotelform.hotelUrl" placeholder="输入酒店官网地址" style="width:350px" ref="hotelUrl"></el-input>
      </el-form-item>
      <el-form-item v-if="hotelform.hotelType===2">
        <el-upload class="upload-demo" action="http://m.haiyaozhu.com/openapi/eb/upload" name="uploadimage" :data="formdata" :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError">
          <el-button size="medium" type="primary">上传酒店公众号二维码
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过4M</div>
        </el-upload>
        <img :src="hotelform.weChatUrl" v-if="hotelform.weChatUrl" class="qrcode" />
      </el-form-item>
      <el-form-item label="所属集团" prop="groupID">
        <el-radio-group v-model="hotelform.groupID">
          <el-radio :label="group.id" v-for="group of groups" :key="group.id">{{group.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="酒店星级" prop="start">
        <el-select v-model="hotelform.start" placeholder="请选择" clearable>
          <el-option :label="1.5" :value="1.5"> </el-option>
          <el-option :label="2" :value="2"> </el-option>
          <el-option :label="2.5" :value="2.5"> </el-option>
          <el-option :label="3" :value="3"> </el-option>
          <el-option :label="3.5" :value="3.5"> </el-option>
          <el-option :label="4" :value="4"> </el-option>
          <el-option :label="4.5" :value="4.5"> </el-option>
          <el-option :label="5" :value="5">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐首页">
        <el-switch v-model="hotelform.isPriority" active-color="#13ce66" :width="50">
        </el-switch>
      </el-form-item>
      <el-form-item label="酒店简介" prop="hotelDesc" style="height:200px;">
        <quill-editor v-model="hotelform.hotelDesc" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
        </quill-editor>
      </el-form-item>
      <template v-for="promotion of hotelform.hotelPromotions">
        <el-form-item label="优惠Code">
          <el-input v-model="promotion.couponCode" style="width:350px" placeholder="请输入酒店优惠code"></el-input>
        </el-form-item>
        <el-form-item label="优惠政策">
          <el-input v-model="promotion.couponPolicy" style="width:350px" placeholder="请输入酒店优惠政策"></el-input>
        </el-form-item>
        <el-form-item label="优惠时间">
          <el-col :span="5">
            <el-date-picker v-model="promotion.couponEffectDate" type="date" placeholder="优惠开始时间">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="1">—</el-col>
          <el-col :span="5">
            <el-date-picker v-model="promotion.couponExpDate" type="date" placeholder="优惠到期时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠简介" style="height:200px;">
          <quill-editor v-model="promotion.recommendShortText" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="优惠详情" style="height:200px;">
          <quill-editor v-model="promotion.recommendText" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm('hotelform')">提交</el-button>
        <el-button @click="resetForm('hotelform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.form {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.el-cascader-menu {
  height: 450px;
}
.qrcode {
  width: 150px;
  margin: 10px;
  padding: 5px;
  border: 1px solid #b5bac0;
  border-radius: 3px;
  box-sizing: border-box;
  z-index: 0;
}
.el-radio {
  width: 120px;
  margin-left: 30px;
}
.el-radio-group {
  margin-left: -30px;
}
.editer {
  width: 700px;
  height: 150px;
}
.line{
  text-align: center;
}
</style>
<script>
import city from '@/api/city'
import login from '@/api/login'
import hotelGroup from '@/api/hotelgroup'
import { ERROR, SUCCESS } from '@/api/errorcode'
import utils from '@/common/utils'
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      hotelform: {
        hotelName: '',
        hotelAddress: '',
        hotelTel: '',
        cityID: 0,
        hotelType: 1,
        hotelUrl: '',
        weChatUrl: '',
        groupID: 0,
        start: 1.5,
        isPriority: false,
        hotelDesc: '',
        hotelPromotions: [{
          couponEffectDate: '',
          couponExpDate: '',
          couponCode: '',
          couponPolicy: '',
          recommendShortText: '',
          recommendText: ''
        }]
      },
      originalCity: [],
      formatCity: [{
        label: '国内',
        cities: [],
        ID: 0
      },
      {
        label: '国际',
        cities: [],
        ID: -1
      }],
      props: {
        value: 'ID',
        label: 'label',
        children: 'cities'
      },
      selectedCity: [0, 1],
      formdata: {
        token: '',
        hoteluid: '',
        hotelid: 0,
        baseroomid: '-2'
      },
      // 酒店集团集合
      groups: [],
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }]]
        },
        placeholder: '请输入...'
      }
    }
  },
  methods: {
    onEditorReady(editor) {
    },
    submitForm(formName) {
      console.log(this.hotelform.hotelDesc)
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
      })
      if (this.hotelform.hotelType === 1 && this.hotelform.hotelUrl === '') {
        this.$message.error('酒店官网必须输入官网链接地址')
        return false
      }
      if (this.hotelform.hotelType === 2 && this.hotelform.weChatUrl === '') {
        this.$message.error('酒店公众号必须上传二维码')
        return false
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 选中的城市
    choicedCity(val) {
      console.log(val)
    },
    loadCities() {
      this.originalCity.filter((value, index, arr) => {
        if (value.IsIntl === 0) {
          this.formatCity[0].cities.push({
            label: value.CityName + ' ' + value.CityPinyin.trim().charAt(0).toUpperCase(),
            ID: value.Id
          })
        }
      })
      this.originalCity.filter((value, index, arr) => {
        if (value.IsIntl === 1) {
          this.formatCity[1].cities.push({
            label: value.CityName + ' ' + value.CityPinyin.trim().charAt(0).toUpperCase(),
            ID: value.Id
          })
        }
      })
    },
    loadTextOrUpload(val) {
      console.log(val)
    },
    beforeUpload(file) {
      const isSafe = utils.allowUploadFile(file.type)
      if (!isSafe) {
        this.$message.error('上传头像图片只能是 jpg/png/jpeg 格式!')
      }
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      this.formdata.token = login.getToken()
      return isSafe && isLt4M
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === ERROR) {
        this.$message.error('上传发生错误')
      } else if (response.code === SUCCESS) {
        // todo 成功
        this.$notify({ type: 'success', title: '成功', message: '图片上传成功' })
        this.hotelform.weChatUrl = response.image.ImageUrl
      }
    },
    uploadError(response, file, fileList) {
      this.$message.error('上传发生错误')
    }
  },
  created() {
    // 城市
    city.getCities().then(response => {
      if (utils.isJSON(response) && response.code === SUCCESS) {
        // 按字母排序
        this.originalCity = response.data.sort((a, b) => {
          if (a.CityPinyin.trim().charAt(0).toUpperCase() > b.CityPinyin.trim().charAt(0).toUpperCase()) {
            return 1
          } else if (a.CityPinyin.trim().charAt(0).toUpperCase() === b.CityPinyin.trim().charAt(0).toUpperCase()) {
            return 0
          } else {
            return -1
          }
        })
        this.loadCities()
      } else {
        this.$message.warning('城市加载失败')
      }
    })
    // 集团
    hotelGroup.getHotelGroups().then(response => {
      if (utils.isJSON(response) && response.code === SUCCESS) {
        this.groups = response.data.sort((a, b) =>
          a.GroupName.localeCompare(b.GroupName, 'zh-Hans-CN', { sensitivity: 'accent' })
        ).map((value, index, arr) => {
          return {
            id: value.GroupId,
            name: value.GroupName
          }
        })
        this.groups.unshift({ id: 0, name: '单体酒店' })
      } else {
        this.$message.warning('酒店集团加载失败')
      }
    })
  },
  components: {
    quillEditor
  }
}
</script>