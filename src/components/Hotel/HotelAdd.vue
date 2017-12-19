<template>
  <div class="form">
    <el-form label-width="80px" :model="hotelform" ref="hotelform">
      <el-form-item label="酒店名称" prop="hotelName" :rules="[{ required: true, message: '酒店名不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelName" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="酒店地址" prop="hotelAddress" :rules="[{ required: true, message: '酒店地址不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelAddress" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="酒店电话" prop="hotelTel" :rules="[{ required: true, message: '酒店电话不能为空', trigger: 'blur'}]">
        <el-input v-model="hotelform.hotelTel" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="cityID">
        <el-cascader :options="city" @active-item-change="choiceCity" :props="props"></el-cascader>
      </el-form-item>
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
</style>
<script>
export default {
  data() {
    return {
      hotelform: {
        hotelName: '',
        hotelAddress: '',
        hotelTel: '',
        cityID: 0,
        hotelType: 0,
        start: 1.5,
        isPriority: 0,
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
      city: [{
        domstic: 0,
        label: '国内',
        cities: []
      },
      {
        domstic: 1,
        label: '国际',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    choiceCity(val) {
      console.log(val)
    }
  },
  created() {
    // todo
  }
}
</script>