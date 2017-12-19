<template>
  <div>
    <el-upload class="upload-demo" action="http://m.haiyaozhu.com/openapi/eb/upload" name="uploadimage" :data="formdata" :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError">
      <el-button size="medium" type="primary">上传酒店图片
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过4M</div>
    </el-upload>
    <ul>
      <li v-for="img of hotelimages" :key="img.id"><img :src="img.ImageUrl" />
        <div>
          <i class="close el-icon-delete" @click="deleteImage(img.id)"></i>
        </div>

      </li>
    </ul>
  </div>
</template>
<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li {
  float: left;
  position: relative;
}
ul li img {
  width: 150px;
  margin: 10px;
  padding: 5px;
  border: 1px solid #b5bac0;
  border-radius: 3px;
  box-sizing: border-box;
  z-index: 0;
}
ul li div {
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
ul li div:hover {
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
import { ERROR, SUCCESS } from '@/api/errorcode'
export default {
  props: ['hotelimages', 'hotelinfo'],
  data() {
    return {
      formdata: {
        token: '',
        hoteluid: '6aa18ecca4d911e6-93354437e6c45e3f',
        hotelid: 38,
        baseroomid: 0
      }
    }
  },
  created() {
    this.hotelimages = [
      {
        ImageUrl: 'http://o9w04gb4c.bkt.clouddn.com/hyz-images/h38/8ca26f17423f4f09b88618f8ff8ab04e.jpg?imageView2/1/w/550/h/412',
        id: 36
      },
      {
        ImageUrl: 'http://o9w04gb4c.bkt.clouddn.com/hyz-images/h38/8ca26f17423f4f09b88618f8ff8ab04e.jpg?imageView2/1/w/550/h/412',
        id: 32
      },
      {
        ImageUrl: 'http://o9w04gb4c.bkt.clouddn.com/hyz-images/h38/8ca26f17423f4f09b88618f8ff8ab04e.jpg?imageView2/1/w/550/h/412',
        id: 62
      }
    ]
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
      this.formdata.token = login.getToken()
      return isSafe && isLt4M
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === ERROR) {
        this.$message.error('上传发生错误')
      } else if (response.code === SUCCESS) {
        // todo 成功
        this.$notify({ type: 'success', title: '成功', message: '图片上传成功' })
        if (this.hotelimages === undefined) {
          this.hotelimages = []
        }
        this.hotelimages.push({ id: response.image.id, ImageUrl: response.image.ImageUrl })
      }
    },
    uploadError(response, file, fileList) {
      this.$message.error('上传发生错误')
    },
    deleteImage(id) {
      this.$confirm('此操作将永久删除该图片,是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        hotel.deleteHotelImage({ uid: this.hotelinfo.uid, hotelID: this.hotelinfo.hotelID, id: id }).then(response => {
          if (response === SUCCESS) {
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