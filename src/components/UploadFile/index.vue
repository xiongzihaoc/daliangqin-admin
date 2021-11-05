<template>
  <div class="container">
    <el-upload action="https://cdn.daliangqing.com"
      :data="dataObj"
      :multiple="false"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :on-remove="handleRemove"
      class="w100"
      :on-progress="handleUploadProgress"
      :on-success="handleUploadSuccess">
      <el-input class="w100"
        readonly
        v-model="uploadValue"></el-input>
    </el-upload>
    <el-progress v-show="percentage < 100 && percentage > 0"
      :percentage="percentage"
      status="success"></el-progress>
  </div>
</template>
<script>
import { httpAdminUploadApi } from '@/api/admin/httpAdminUploadApi'
export default {
  name: 'SingleUpload',
  props: {
    value: String,
    uploadType: String,
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        host: '',
      },
      percentage: 0,
      infoList: [],
    }
  },
  mounted() {
    httpAdminUploadApi
      .postAliyunSignAdmin({ adminUpload: this.uploadType })
      .then((res) => {
        this.infoList = res.data
      })
  },
  computed: {
    uploadValue: {
      get() {
        return this.value
      },
      set(val) {
        this.value = val
      },
    },
  },
  methods: {
    handleRemove(file, fileList) {
      //   this.emitInput("");
    },
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        return (
          c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8'
        ).toString(16)
      })
    },
    beforeUpload(file) {
      if (this.uploadType === 'MUSIC') {
        if (file.type != 'audio/mpeg' && file.type != 'audio/ogg') {
          return this.$message.error('请上传mp3格式文件')
        }
      }
      const _self = this
      _self.dataObj.policy = this.infoList.policy
      _self.dataObj.signature = this.infoList.signature
      _self.dataObj.ossaccessKeyId = this.infoList.accessId
      _self.dataObj.key = this.infoList.key + file.name
      _self.dataObj.host = this.infoList.endPoint
    },
    handleUploadProgress(event, file, fileList) {
      this.$emit('uploadProgress', event.percent)
    },
    handleUploadSuccess(response, file, fileList) {
      let value = 'https://cdn.daliangqing.com/' + encodeURIComponent(this.dataObj.key)
      this.uploadValue = 'https://cdn.daliangqing.com/' + encodeURIComponent(this.dataObj.key)
      console.log(this.uploadValue)
    this.$emit('uploadFinish', value)
    },
  },
}
</script>
<style>
.container .el-upload--text {
  width: 100%;
}
</style>
