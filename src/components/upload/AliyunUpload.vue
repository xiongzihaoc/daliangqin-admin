<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :with-credentials="true"
    :http-request="httpRequest"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { httpAdminUploadApi } from '@/api/admin/httpAdminUploadApi'

export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    httpRequest(file) {
      httpAdminUploadApi.postAliyunSignAdmin('BANNER').then(res => {
        console.log(res)
      })

      let OSS = require('ali-oss')

      let client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'yourRegion',
        // 从STS服务获取的临时访问凭证。临时访问凭证包括临时访问密钥（AccessKeyId和AccessKeySecret）和安全令牌（SecurityToken）。
        accessKeyId: 'yourAccessKeyId',
        accessKeySecret: 'yourAccessKeySecret',
        stsToken: 'yourSecurityToken',
        // 填写Bucket名称。
        bucket: 'examplebucket'
      })

// 支持File对象、Blob数据以及OSS Buffer。
// 填写本地文件的完整路径。如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      const data = 'D:\\localpath\\examplefile.txt'
// 填写上传的内容。
//const data = new Blob('Hello OSS');
// 填写上传的内容。
//const data = new OSS.Buffer('Hello OSS'));

      async function putObject() {
        try {
          // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
          // 您可以通过自定义文件名（例如exampleobject.txt）或目录（例如mytestdoc/exampleobject.txt）的形式实现将文件上传到当前Bucket或Bucket中的指定目录。
          const result = await client.put('exampleobject.txt', data)
          console.log(result)
        } catch (e) {
          console.log(e)
        }
      }

      putObject()
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
