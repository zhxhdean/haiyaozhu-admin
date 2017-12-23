<template>
  <div>
    <el-upload v-loading="loading" element-loading-text="图片上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="upload-demo" action="http://m.haiyaozhu.com/openapi/eb/upload" name="uploadimage" :data="formdata" :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError">
      <el-button size="medium" type="primary">上传酒店图片
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过4M</div>
    </el-upload>
    <ul class="images">
      <li v-for="img of hotelImages" :key="img.id"><img :src="img.ImageUrl" />
        <div>
          <i class="close el-icon-delete" @click="deleteImage(img.id)"></i>
        </div>

      </li>
    </ul>
  </div>
</template>
<style>
.images {
  list-style: none;
  margin: 0;
  padding: 0;
}
.images li {
  float: left;
  position: relative;
}
.images li img {
  width: 150px;
  height:115px;
  max-height: 115px;
  margin: 10px;
  padding: 5px;
  border: 1px solid #b5bac0;
  border-radius: 3px;
  box-sizing: border-box;
  z-index: 0;
}
.images li div {
  height: 30px;
  line-height: 30px;
  background: #000;
  position: absolute;
  top: 90px;
  width: 150px;
  left: 10px;
  z-index: 10;
  opacity: 0;
}
.images li div:hover {
  opacity: 0.75;
}
.close {
  margin-left: 15px;
  cursor: pointer;
  color: #fff;
}
.close:hover {
  display: inline-block;
}
</style>
<script>
import utils from '@/common/utils'
import login from '@/api/login'
import hotel from '@/api/hotel'
import { ERROR, SUCCESS, TOKEN_INVALID, NOT_MATCH_UID } from '@/api/errorcode'
export default {
  props: ['hotelImages', 'hotelInfo'],
  data() {
    return {
      loading: false,
      formdata: {
        token: '',
        hoteluid: '',
        hotelid: 0,
        baseroomid: 0
      }
    }
  },
  created() {
  },
  methods: {
    beforeUpload(file) {
      const isSafe = utils.allowUploadFile(file.type)
      if (!isSafe) {
        this.$message.error('上传头像图片只能是 jpg/png/jpeg 格式!')
      }
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      this.formdata.hoteluid = this.hotelInfo.uid
      this.formdata.hotelid = this.hotelInfo.hotelID
      this.formdata.token = login.getToken()
      this.loading = true
      return isSafe && isLt4M
    },
    uploadSuccess(response, file, fileList) {
      this.loading = false
      if (response.code === ERROR) {
        this.$message.error('上传发生错误')
      } else if (response.code === NOT_MATCH_UID) {
        this.$message.error('酒店ID不匹配错误')
      } else if (response.code === SUCCESS) {
        // todo 成功
        this.$notify({ type: 'success', title: '成功', message: '图片上传成功' })
        this.hotelImages.push({ id: response.image.id, ImageUrl: response.image.ImageUrl })
      } else if (response.code === TOKEN_INVALID) {
        this.$message.error('token已过期,请重新登录')
      }
    },
    uploadError(response, file, fileList) {
      this.loading = false
      this.$message.error('上传发生错误')
    },
    deleteImage(id) {
      this.$confirm('此操作将永久删除该图片,是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        hotel.deleteHotelImage({ uid: this.hotelInfo.uid, hotelID: this.hotelInfo.hotelID, id: id }).then(response => {
          if (response === SUCCESS) {
            this.hotelImages.find((value, index, arr) => {
              if (value.id === id) {
                this.hotelImages.splice(index, 1)
              }
            })
            this.$notify({ type: 'success', title: '成功', message: '图片已成功删除' })
          } else {
            this.$message.error(response)
          }
        })
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>